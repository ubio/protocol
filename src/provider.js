'use strict';

const Protocol = require('./protocol');
const fetch = require('node-fetch');

const DEFAULT_OPTIONS = {
    urlTemplate: 'https://raw.githubusercontent.com/universalbasket/protocol/{tag}/schema.json',
    latestTtl: 3 * 60000,
    autoRefreshInterval: 0,
};

module.exports = class ProtocolProvider {

    constructor(options = {}) {
        Object.assign(this, DEFAULT_OPTIONS, options);
        this.versionsCache = new Map(); // version -> protocol
        this.latest = null;
        this.latestFetchedAt = 0;
        this.autoRefresh();
    }

    autoRefresh() {
        const interval = this.autoRefreshInterval;
        if (!interval) {
            return;
        }
        const repeat = () => this.autoRefreshTimer = setTimeout(() => this.autoRefresh(), interval);
        this.fetchLatest()
            .then(repeat, repeat);
    }

    stopAutoRefresh() {
        clearTimeout(this.autoRefreshTimer);
    }

    async fetchVersion(version) {
        if (version === 'latest') {
            return await this.fetchLatest();
        }
        const cached = this.versionsCache.get(version);
        if (cached) {
            return cached;
        }
        const schema = await this.fetchSchema(version);
        const protocol = new Protocol(schema);
        this.versionsCache.set(version, protocol);
        return protocol;
    }

    async fetchLatest() {
        const stale = (this.latestFetchedAt + this.latestTtl) < Date.now();
        const cached = this.latest && !stale;
        if (cached) {
            return cached;
        }
        const schema = await this.fetchSchema('master');
        const protocol = new Protocol(schema);
        this.latest = protocol;
        this.latestFetchedAt = Date.now();
        return protocol;
    }

    async fetchSchema(tag) {
        const url = this.urlTemplate.replace('{tag}', tag);
        const res = await fetch(url);
        const { status } = res;
        if (res.status >= 400) {
            throw new RemoteProtocolFetchError(`server returned ${status}`, {
                url,
                tag,
                status,
            });
        }
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (err) {
            throw new RemoteProtocolFetchError('JSON parse failed', {
                url,
                tag,
                text,
            });
        }
    }

};

class RemoteProtocolFetchError extends Error {
    constructor(message, details = {}) {
        const tag = details.tag || '???';
        super(`Could not fetch protocol@${tag}: ${message}`);
        this.name = this.constructor.name;
        this.details = details;
    }
}
