const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
    return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
    configureWebpack: {
        // Ignore all locale files of moment.js
        plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, "src/app.less")] // 引入全局样式变量
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@layouts', resolve('src/layouts'))
            .set('@constants', resolve('src/constants'))
            .set('@components', resolve('src/components'))
            .set('@router', resolve('src/router'))
            .set('@jsModule', resolve('src/jsModule'))
            .set('@utils', resolve('src/utils'))
            .set('@store', resolve('src/store'))
            .set('@views', resolve('src/views'))
            .set('@mock', resolve('src/mock'))
    },
    // 服务转发
    devServer: {
        port: 8003,
        proxy: {
            '/chat/': {
                target: 'ws://localhost:3000', 
                changeOrigin: true,
                ws: false,    // 开启sockjs
            },
            '/api/': {
                target: 'http://localhost:3000', 
                changeOrigin: true,
                ws: false,    // 关闭sockjs
            },
        },
    },

    // 打包不生成未压缩的文件
    productionSourceMap: false,
    // 开发环境，运行时开启eslint
    lintOnSave: true,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: [],
}
