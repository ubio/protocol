import { Protocol } from './protocol';
import fetch from 'node-fetch';

export interface ProtocolProviderOptions {
    url: string;
    ttl: number;
    autoRefresh: boolean;
}

export const DEFAULT_OPTIONS: ProtocolProviderOptions = {
    url: 'https://protocol.automationcloud.net/schema.json',
    ttl: 3 * 60000,
    autoRefresh: false
};

export class ProtocolProvider {
    options: ProtocolProviderOptions;
    versionsCache: Map<string, Protocol> = new Map();
    latest: Protocol | null = null;
    latestFetchedAt: number = 0;

    protected autoRefreshTimer: any;

    constructor(options: Partial<ProtocolProviderOptions> = {}) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.startAutoRefresh();
    }

    // Note: getters and setters are provided for backwards compatibility
    get url() { return this.options.url; }
    set url(value: string) { this.options.url = value; }
    get ttl() { return this.options.ttl; }
    set ttl(value: number) { this.options.ttl = value; }

    startAutoRefresh() {
        if (!this.options.autoRefresh) {
            return;
        }
        const interval = this.ttl;
        const repeat = () => {
            clearTimeout(this.autoRefreshTimer);
            this.autoRefreshTimer = setTimeout(() => this.startAutoRefresh(), interval);
        };
        this.fetchLatest()
            .then(repeat, repeat);
    }

    stopAutoRefresh() {
        clearTimeout(this.autoRefreshTimer);
    }

    async fetchVersion(version: string): Promise<Protocol> {
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
        const stale = (this.latestFetchedAt + this.ttl) < Date.now();
        if (this.latest && !stale) {
            return this.latest;
        }
        const schema = await this.fetchSchema('master');
        const protocol = new Protocol(schema);
        this.latest = protocol;
        this.latestFetchedAt = Date.now();
        return protocol;
    }

    async forceRefreshLatest() {
        this.latestFetchedAt = 0;
        return await this.fetchLatest();
    }

    async fetchSchema(tag: string) {
        const url = this.url.replace('{tag}', tag);
        // Note: this is necessary for running protocol in browser
        const fetchOptions: any = { mode: 'cors' };
        const res = await fetch(url, fetchOptions);
        const { status } = res;
        if (res.status >= 400) {
            throw new RemoteProtocolFetchError(`server returned ${status}`, {
                url,
                tag,
                status
            });
        }
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (err) {
            throw new RemoteProtocolFetchError('JSON parse failed', { url, tag, text });
        }
    }

}

export class RemoteProtocolFetchError extends Error {
    details: any;
    constructor(message: string, details: any = {}) {
        const tag = details.tag || '???';
        super(`Could not fetch protocol@${tag}: ${message}`);
        this.name = this.constructor.name;
        this.details = details;
    }
}
