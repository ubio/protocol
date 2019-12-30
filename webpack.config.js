const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const outputDir = path.resolve(process.cwd(), './docs');

module.exports = {
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
        contentBase: outputDir,
    }
}
