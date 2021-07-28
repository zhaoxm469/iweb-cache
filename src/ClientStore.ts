import { IcacheOptions, IclientStore, IglobalVariableData } from './types';

type cacheOptionsRequireType = Required<IcacheOptions>;

export default class ClientStore implements IclientStore {
    storage: Storage;
    options: cacheOptionsRequireType;
    constructor(options: cacheOptionsRequireType) {
        this.options = options;
        this.storage = window[this.options.storageType];
    }
    del(key: string): void {
        this.storage.removeItem(key);
    }
    clear(): void {
        this.storage.clear();
    }
    get(key: string): string | null {
        return this.storage.getItem(key);
    }
    save(value: IglobalVariableData) {
        this.storage.setItem(this.options.prefix, JSON.stringify(value));
    }
    getCacheData(): IglobalVariableData {
        const cacheData = this.storage.getItem(this.options.prefix);
        try {
            return cacheData ? JSON.parse(cacheData) : {};
        } catch (err) {
            console.error(err);
            return {};
        }
    }
}
