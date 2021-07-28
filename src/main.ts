import ClientStore from './ClientStore';
import WebCache from './WebCache';
import { IcacheOptions } from './types';

const defaultOps: IcacheOptions = {
    storageType: 'localStorage',
    prefix: 'iweb-cache',
    expires: 0
};

export default function (options?: IcacheOptions) {
    options = Object.assign({}, options, defaultOps);
    const clientStore = new ClientStore(options);
    return new WebCache(clientStore);
}
