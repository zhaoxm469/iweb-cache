/**
 * @description: 判断字符串是否是对象类型
 * @param {string} str
 * @return { boolean }
 */
export const isJsonStr = (str: string): boolean => {
    let re = /^{(.*)}$/;
    return re.test(str);
};

/**
 * @description: 异步获取本地存储的最大限制
 * @return { Promise(size:number) } size 单位M
 */
export const storeMaximumLimit = async () => {
    const store = window.localStorage;
    if (!store) {
        console.log('当前浏览器不支持localStorage!');
        return false;
    }
    store.clear();

    console.time('limit');
    let storeData = new Array(1024 * 1024).fill('1').join(''),
        size = 0;

    return new Promise((resolve) => {
        (function setStore() {
            try {
                size++;
                store.setItem(size + '', storeData);
                requestAnimationFrame(setStore);
            } catch (err) {
                console.error(`最大限制为：${size}M`);
                console.timeEnd('limit');
                store.clear();
                return resolve(size);
            }
        })();
    });
};

/**
 * @description: 判断当前值是否能够呗JSON.stringify识别
 * @param { any } data
 * @return { boolean }
 */
export function hasStringify(data: any): boolean {
    if (
        data instanceof Function ||
        typeof data === 'symbol' ||
        typeof data === 'symbol' ||
        data === undefined ||
        data === null
    ) {
        return false;
    }

    return true;
}
