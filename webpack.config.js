const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const outputDir = path.resolve(process.cwd(), './docs');
const publicDir = path.resolve(process.cwd(), './public');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        app: './site/index.js',
    },
    output: {
        path: outputDir,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        static: [
            {
                directory: outputDir,
                publicPath: '/'
            },
            {
                directory: publicDir,
                publicPath: '/'
            }
        ],
        hot: true
    }
}
