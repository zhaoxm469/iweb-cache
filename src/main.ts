import ClientStore from './ClientStore';
import WebCache from './WebCache';
import { IcacheOptions } from './types';

const defaultOps: Required<IcacheOptions> = {
    storageType: 'localStorage',
    prefix: 'iweb-cache',
    expires: 0
};

export default function (options?: IcacheOptions) {
    const opts = Object.assign({}, defaultOps, options);
    const clientStore = new ClientStore(opts);
    return new WebCache(clientStore);
}
