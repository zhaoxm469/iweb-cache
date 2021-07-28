import {
    IglobalVariableData,
    cacheNotValueType,
    IclientStore,
    IwebCache
} from './types';

import { hasStringify, isJsonStr } from './utils';

class WebCache implements IwebCache {
    appData: IglobalVariableData = {};
    private clientStore: IclientStore;

    constructor(clientStore: IclientStore) {
        this.clientStore = clientStore;
        this.appData = this.clientStore.getCacheData();
    }

    save(key: string, value: any, expires?: number): boolean {
        if (!key || typeof key !== 'string') throw new Error('key not string!');

        if (!hasStringify(value)) {
            throw new Error(
                'Check whether the stored value can be serialized by json.stringify'
            );
        }

        value = JSON.stringify(value);

        let saveData = {
            value,
            expires: this.getExpires(expires)
        };

        this.appData[key] = saveData;

        this.clientStore.save(this.appData);

        return true;
    }

    get<T = any>(key: string): T | cacheNotValueType {
        const data = this.appData[key] ? this.appData[key] : false;

        const now = +new Date();

        if ((data && data.expires && now > Number(data.expires)) || !data) {
            delete this.appData[key];
            this.clientStore.save(this.appData);
            return false;
        }

        try {
            return isJsonStr(data.value) ? JSON.parse(data.value) : data.value;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    getAll(...arg: string[]): [any] {
        if (!arg.length) new Error('key not .');

        const newList = arg.reduce<any>((a, b) => {
            let data = this.get(b);
            a.push(data);
            return a;
        }, []);

        return newList;
    }

    del(key: string): boolean {
        if (this.appData[key]) {
            delete this.appData[key];
            this.clientStore.del(key);
            return true;
        }
        return false;
    }

    clear(): void {
        this.appData = {};
        this.clientStore.clear();
    }

    cover(key: string, value: any) {
        let data = this.appData[key];
        if (data && data.expires) {
            this.save(key, value, data.expires - +new Date());
        } else {
            this.save(key, value);
        }
    }

    getExpires(expires: number = 0): number {
        if (!expires) expires = this.clientStore.options.expires as number;
        if (typeof expires !== 'number') throw new Error('expires not number!');

        return expires ? +new Date() + expires : 0;
    }

    getCacheSize() {
        let size = 0;
        if (this.appData) {
            for (let item in this.appData) {
                size += JSON.stringify(this.appData[item]).length;
            }
            return size;
        }
        return false;
    }
}

export default WebCache;
