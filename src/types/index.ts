export type drivingType = 'localStorage' | 'sessionStorage';
export type cacheGetKeyValueType = string | object | boolean;
export type ICacheDataList = cacheGetKeyValueType[];

export interface IglobalVariableData {
    [key: string]: ICacheData;
}

export interface IcacheOptions {
    // 使用哪种方式进行数据存储
    storageType: drivingType;
    // 储存数据的前缀
    prefix: string;
    // 全局过期时间
    expires?: number;
}

export interface ICacheData {
    // 存储的数据
    value: string;
    // 单个数据的过期时间
    expires?: number;
}

export interface IwebCache {
    // 设置缓存
    save(key: string, value: any, expires?: number): boolean;
    // 覆盖缓存数据，但不更新过期时间
    cover(key: string, value: any): void;
    // 根据指定key获取缓存数据
    get(key: string): cacheGetKeyValueType;
    // 根据key获取多条缓存数据
    getAll(...arg: string[]): ICacheDataList;
    // 获取缓存内容的大小
    getCacheSize(): number | boolean;
    // 根据key删除指定缓存数据
    del(key: string): boolean;
    // 清空全部缓存数据
    clear(): void;
}

// 本地存数方法代理
export interface IclientStore {
    save(value: IglobalVariableData): void;
    get(key: string): string | null;
    del(key: string): void;
    clear(): void;
    getCacheData(): IglobalVariableData;
}
