import ClientStore from './ClientStore';
import WebCache from './WebCache';
import { IcacheOptions } from './types';

const defaultOps: IcacheOptions = {
    storageType: 'localStorage',
    prefix: 'iweb-cache',
    expires: 0
};

export default function (options: IcacheOptions = defaultOps) {
    options = Object.assign({}, defaultOps, options);
    const clientStore = new ClientStore(options);
    return new WebCache(clientStore);
}
