# 说明

轻量且强悍的 Cache库, 为您暴露丰富而统一的 API, 使得业务调用更加简便.  

1. 速度更快: 优先操作读取内存中的变量.
2. 更方便: 可以直接存储JSON格式数据, 无需手动转换成字符串.
3. 支持设置存储的失效时间.
4. 自动识别存储数据类型, 获取时候能准确返回存储数据的类型.

## 存储数据类型

支持:  

1. Number
2. String
3. Null
4. Undefined
5. Object
6. Array
7. RegExp
8. Boolean

不支持:  

Symbol, BigInt, Function 这三个类型的数据不能进行存储! 

## 安装和使用

NPM方式:

```bash
npm install iweb-cache -S
```

```js
import iwebCache from 'iweb-cache'
// or
const iwebCache = require('iweb-cache')

const $cache = iwebCache();
```

CDN方式:

```html
<script src="https://cdn.jsdelivr.net/npm/iweb-cache/dist/index.umd.js"></script>
<script>
    const $cache = window.iwebCache();
</script>
```

### 初始化配置参数

```js
// 1.无其他配置
const $cache = iwebCache();

// 2.配置选项
const $cache = iwebCache({
    // 缓存驱动类型，默认为 localStorage
    storageType: 'localStorage',
    // 主要避免通一个域下有两个前端项目，如果不设置前缀可能会冲突
    prefix: 'abc',
    // 所有存储的数据默认过期时间, 单位毫秒
    // 如果是sessionStorage, 那么是会话期间有效, 只有 type 为 localStorage才可能是永久不会过期
    expires: 1000 * 5
});
```

### 设置缓存

```js
$cache.save('userInfo', {
    name: '张三'
})

// 储存数据在5秒钟失效
$cache.save('token', '123456', 1000 * 5)

setTimeout(() => {
    const token = $cache.get('token') // -> false
}, 5010);
```

### 读取缓存数据

```js
const token = $cache.get('token')

// 读取没有的缓存数据
const token1 = $cache.get('token1') // -> false

// 读取多个缓存数据
const [token2, userInfo] = $cache.getAll('token', 'userInfo');
```

### 覆盖 value 的值, 但是不更新过期时间

```js
$cache.cover('token', '123123');
```

### iwebCache options  

属性|说明|类型|默认值
-----|-----|-----|-----
storageType|数据存数的驱动|string|localStorage
prefix|存放在浏览的缓存前缀|string|-
expires|全局设置-存储数据的默认过期时间|number(单位毫秒)|-

### cache api

方法名|说明|参数
-----|-----|-----
save|设置缓存|(key: string, value: any, [expires:number]):boolean
cover|覆盖 value , 但不更新过期时间|(key: string, value: any):boolean
get|获取缓存数据|(key: string):cacheData|boolean
getAll|获取多条缓存数据|(...[string]): [value|boolean, ...]
del|删除指定key的缓存数据|(key: string):boolean
clear|删除全部缓存数据|-

#### 联系我

zhaoxm469@163.com
