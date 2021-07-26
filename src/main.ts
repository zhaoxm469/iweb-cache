/*
 * @Author: zhaoxingming
 * @Date: 2021-07-09 11:01:05
 * @LastEditTime: 2021-07-15 11:16:00
 * @LastEditors: vscode
 * @Description: 本地存储方法封装，让开发人员更便捷的使用！
 *
 */

import { name } from './person';

type cacheDataType = {
    [cacheKeyName: string]: string;
};

export default class AppCache {
    prefix: string;

    data: cacheDataType = {};

    constructor(prefix = 'app') {
        this.prefix = prefix;
        this.init();
        console.log(name);
    }

    init(): void {
        const data = localStorage.getItem(this.prefix);
        if (data) this.data = JSON.parse(data);
    }

    /**
     * @description: 根据key获取本地存储的数据
     * @param {string} cacheKeyName
     * @return { cacheDataType|boolean } 有数据返回数据，无数据返回false
     */
    get(cacheKeyName: string): boolean | cacheDataType {
        const keyName = this.setCacheKeyName(cacheKeyName);
        if (this.data[keyName]) return JSON.parse(this.data[keyName]);
        return false;
    }

    /**
     * @description:获取全部本地存储数据
     * @return {  boolean | cacheDataType }
     */
    getAll(): boolean | cacheDataType {
        if (localStorage.getItem(this.prefix)) {
            return JSON.parse(localStorage.getItem(this.prefix) as string);
        }
        return false;
    }

    /**
     * @description: 存储数据
     * @param {string} cacheKeyName
     * @param {cacheDataType} value
     * @return { void }
     */
    save(cacheKeyName: string, value: cacheDataType | string | number): void {
        const keyName = this.setCacheKeyName(cacheKeyName);
        this.data[keyName] = JSON.stringify(value);
        localStorage.setItem(this.prefix, JSON.stringify(this.data));
    }

    /**
     * @description: 给本地储存的key设置前缀
     * @param {string} cacheKeyName
     * @return { string }
     */
    setCacheKeyName(cacheKeyName: string): string {
        return `${this.prefix}-${cacheKeyName}`;
    }

    /**
     * @description: 根据指定key 删除本地存储的数据
     * @param {string} cacheKeyName
     * @return { boolean }
     */
    clear(cacheKeyName: string): boolean {
        const keyName = this.setCacheKeyName(cacheKeyName);
        if (this.data[keyName]) {
            delete this.data[keyName];
            localStorage.setItem(this.prefix, JSON.stringify(this.data));
            return true;
        }

        return false;
    }

    /**
     * @description: 清空所有数据
     */
    clearAll(): void {
        this.data = {};
        localStorage.removeItem(this.prefix);
    }
}
