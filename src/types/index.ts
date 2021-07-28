export type storageType = 'localStorage' | 'sessionStorage';
export type cacheGetKeyValueType = string | object | boolean;
export type ICacheDataList = cacheGetKeyValueType[];
export type cacheNotValueType = false;

export interface IglobalVariableData {
    [key: string]: ICacheData;
}

export interface IcacheOptions {
    /**
     * @description  使用哪种方式进行数据存储, 默认值 localStorage
     * @type { string }
     */
    storageType?: storageType;
    /**
     * @description  储存数据的前缀
     * @params { string } iweb-cache
     */
    prefix?: string;
    /**
     * @description  全局过期时间
     * @params { number } 单位毫秒
     */
    expires?: number;
}

export interface ICacheData {
    /**
     * @description 存储的数据
     * @params { string | number | object }
     */
    value: string;
    /**
     * @description 单个数据的过期时间
     * @params { number } 单位秒
     */
    expires?: number;
}

export interface IwebCache {
    appData: IglobalVariableData;
    /**
     * @description 设置缓存
     */
    save<T = any>(key: string, value: T, expires?: number): boolean;
    /**
     * @description  覆盖缓存数据，但不更新过期时间
     */
    cover(key: string, value: any): void;
    /**
     * @description 根据指定key获取缓存数据
     */
    get<T = any>(key: string): T | cacheNotValueType;
    /**
     * @description  获取多条缓存数据
     * @example
     * const [ token,token1 ] = cache.getAll('token','token1')
     */
    getAll(...arg: string[]): [any];
    /**
     * @description  获取缓存内容的大小
     */
    getCacheSize(): number | boolean;
    /**
     * @description  根据key删除指定缓存数据
     */
    del(key: string): boolean;
    /**
     * @description  清空全部缓存数据
     */
    clear(): void;
}

// 本地存数方法代理
export interface IclientStore {
    storage: Storage;
    options: IcacheOptions;
    save(value: IglobalVariableData): void;
    get(key: string): string | null;
    del(key: string): void;
    clear(): void;
    getCacheData(): IglobalVariableData;
}
