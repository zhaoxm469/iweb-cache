import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { defineConfig } from 'rollup';
import dev from 'rollup-plugin-dev';
import path from 'path';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args);

export default defineConfig({
    input: resolve('./src/main.ts'),
    output: [
        {
            file: resolve('./', pkg.main),
            // 暴露外部的全局变量名称
            format: 'umd',
            name: 'iwebCache',
            sourcemap: true
        },
        {
            file: resolve('./', pkg.module),
            format: 'es',
            name: pkg.name,
            sourcemap: true
        }
    ],
    plugins: [
        typescript({
            sourceMap: true
        }),
        nodeResolve({
            extensions,
            modulesOnly: true
        }),
        // babel({
        //     babelHelpers: 'bundled',
        //     exclude: 'node_modules/**',
        //     extensions
        // }),
        dev({
            port: '6666',
            host: 'localhost',
            spa: './examples/es.html',
            force: true
        }),
        livereload()
    ]
});
