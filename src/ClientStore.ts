import { IcacheOptions, IclientStore, IglobalVariableData } from './types';

export default class ClientStore implements IclientStore {
    storage: Storage;
    options: IcacheOptions;
    constructor(options: IcacheOptions) {
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
            return cacheData
                ? (JSON.parse(cacheData) as IglobalVariableData)
                : {};
        } catch (err) {
            console.error(err);
            return {};
        }
    }
}
