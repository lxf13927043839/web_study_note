const path = require('path');

// 导入把HTML页面生成到内存中的插件
const htmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// vue编译
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 这个css压缩的被我卸载了
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: path.join(__dirname, './src/main.js'),
  
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            // 把指定的html页面，作为模板，复制一份托管到内存中去
            template: path.join(__dirname, './src/index.html'),
            // 指定，将来在内存中复制出来的页面，名称叫做index.html
            filename: 'index.html',
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 合并空格
                removeAttributeQuotes: true, // 移除双引号
            }
        }),
        
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new VueLoaderPlugin(),
  
    ],
    /* devServer: {
        open: false,
        port: 3000,
        host: '127.0.0.1',
        hot: true,
    } */
    module: { // 用来配置非js文件对应的loader
        rules: [ // 非js文件和loader之间的对应关系
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 压缩css的被我误卸载了
                {test: /\.css$/, use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            },
                        },
                        'css-loader',
                    ],
                },
                {test: /\.less$/, use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            },
                        },
                        'css-loader',
                        'less-loader',
                    ],
                },
            // {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(png|gif|jpeg|jpg|webp)$/, use: ['url-loader?limit=2353&esModule=false&name=images/[hash:5][name].[ext]']},
            // 对babel规则的配置
            // {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.vue$/, use: ['vue-loader']},
            {test: /\.(eot|woff2|woff|ttf|svg)$/, use: ['url-loader']},
        
        ],
    },
    // 这个是我自己的，不然老是有警告影响调试,好像设置了之后速度快了很多
    mode: 'development',
};