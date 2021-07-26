# 说明  

这里记录了 把项目拉到本地以后您需要做的哪些更改

01. 编辑package.json 修改 `name` 和  `repository` 和  `homepage` 字段 .  
02. 修改 `rollup.config.build.ts` 和 `rollup.config.dev.ts` 里打包输出 umd 文件的 `name` .
03. 在src下面进行源码开发。
04. 运行 `npm run dev` 可打开一个 6666 端口的web服务器, 对应的是 examples 下的页面, 您可进行源码的调试.
05. 开发完毕以后 , 您可 运行 `npm run build` 进行源码的打包.
06. 开发调试完成以后, 您可运行命令 `npm run npmp` 发布到npm.
