import { ProtocolProvider } from '../out/main';

export const provider = new ProtocolProvider({
    autoRefresh: true,
    ttl: 60000
});

provider.startAutoRefresh();
