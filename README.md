# 说明

使用typescript进行编写, 基于rollup打包 . 主要用于工作中 构建库或者插 项目通用模板 .

## 使用

将这个项目克隆到本地, 推荐使用 [fast-template-cli](https://www.npmjs.com/package/fast-template-cli) 进行创建此模板.  

[修改详细说明](./docs/steps.md)

## script 命令

开发, 预览. 访问地址对应 /examples/index.html 页面

* npm run dev  

打包

* npm run build

推送到npm远程

* npm run npmp

## 目录结构

```code
├── README.md                              // 项目文档说明
├── package.json                           // 里边相关配置 需要自己手动更改为项目匹配的信息
├── rollup.config.build.ts                 // rollup打包配置
├── rollup.config.dev.ts                   // rollup开发运行配置
├── npmpublish.js                          // npm 发布命令
├── examples                               // 开发时，运行 npm run dev ，进行代码调试 
│   └── index.html
├── tsconfig.json                          // ts 配置文件
├── test                                   // 测试
├── docs                                   // 文档
├── types                                  // 数据模型
├── dist                                   // 打包编译输出的文件目录
│   ├── npm-package-template.es.js         // 打包输出的 es 引入文件
│   └── npm-package-template.umd.js        // 打包输出的 und 格式文件
└── src                                    // 源码目录
    └── main.ts                            // 源码入口文件
```
