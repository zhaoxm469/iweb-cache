import {
    IglobalVariableData,
    cacheNotValueType,
    IclientStore,
    IwebCache,
    getType
} from './types';

import { getDataType, hasStringify, isJsonStr } from './utils';

class WebCache implements IwebCache {
    appData: IglobalVariableData = {};
    private clientStore: IclientStore;

    constructor(clientStore: IclientStore) {
        this.clientStore = clientStore;
        this.appData = this.clientStore.getCacheData();
    }

    save(key: string, value: any, expires?: number): boolean {
        if (!key || typeof key !== 'string') throw new Error('key not string!');
        const valueType = getDataType(value);

        if (typeof value === 'string') value = value.trim();

        if (!hasStringify(value)) {
            throw new Error(
                'Check whether the stored value can be serialized by JSON.stringify()'
            );
        }

        if (valueType === 'undefined') value = 'undefined';

        if (
            valueType === 'object' ||
            valueType === 'array' ||
            valueType === 'null' ||
            valueType === 'boolean' ||
            valueType === 'number'
        ) {
            value = JSON.stringify(value);
        }

        let saveData = {
            value,
            valueType,
            expires: this.getExpires(expires)
        };

        this.appData[key] = saveData;

        this.clientStore.save(this.appData);

        return true;
    }

    get<T = any>(key: string): getType<T> {
        const data = this.appData[key] ? this.appData[key] : false;

        const now = +new Date();

        if ((data && data.expires && now > Number(data.expires)) || !data) {
            delete this.appData[key];
            this.clientStore.save(this.appData);
            return false;
        }

        const valueType = data.valueType;

        if (valueType === 'undefined') return undefined;

        if (valueType === 'string' || valueType === 'regexp') return data.value;

        try {
            return JSON.parse(data.value);
        } catch (err) {
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
