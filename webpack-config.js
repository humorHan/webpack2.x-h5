/**
 * Created by humorHan on 2017/2/23.
 */
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var node_modules = path.resolve(__dirname, 'node_modules');

var htmlPlugin = (function () {
    var entryHtml = [
        path.resolve(__dirname, 'src/main.html'),
        path.resolve(__dirname, 'src/app.php')
    ];
    var tempArr = [];
    entryHtml.forEach(function (filePath) {
        var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: filePath,
            filename: (function(){
                if (fileName.indexOf('app') > -1) {
                    return fileName + '.php';
                } else {
                    return fileName + '.html';
                }
            })()
        };
        conf.inject = 'body';
        conf.chunks = ['main'];
        tempArr.push(new HtmlWebpackPlugin(conf));
    });
    return tempArr;
})();

/**
 * webpack 配置
 * @param isWatch 监听模式包括watch和cache参数
 * @param isDev   调试模式 vs 线上
 */
module.exports = function (isWatch, isDev) {
    var cssExtractTextPlugin = new ExtractTextPlugin({
        filename: isDev ? 'main.css' : 'main-[contenthash].css',
        disable: false,
        allChunks: true
    });
    return {
        watch: isWatch,
        cache: isWatch,
        devtool: isDev ? "#inline-source-map" : false,//eval-source-map / source-map
        entry: path.join(__dirname, 'src', 'js', 'main.js'),
        output: {
            path: path.join(__dirname, 'dist'),

            filename: isDev ? "js/[name].js" : "js/[name]-[chunkhash].js",
            chunkFilename: isDev ? "js/[name]-chunk.js" : "js/[name]-chunk-[chunkhash].js"
        },
        resolve: {
            modules: [
                path.join(__dirname, 'src', 'dep'),
                path.join(__dirname, 'src', 'scss'),
                path.join(__dirname, 'node_modules')
            ],
            extensions: ['.js', '.scss', '.json'],
            alias: {
                //'mock': path.join(__dirname, 'src', 'dep', 'mock.js'),
                'jquery': path.join(__dirname, 'src', 'dep', 'jquery-3.1.1.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: isDev ?
                        cssExtractTextPlugin.extract({
                            //fallback: 'style-loader',
                            use: [
                                "css-loader?sourceMap",
                                'postcss-loader?sourceMap',
                                "sass-loader?sourceMap"
                            ]
                        }) : cssExtractTextPlugin.extract({
                            //fallback: 'style-loader',
                            use: [
                                "css-loader",
                                'postcss-loader',
                                "sass-loader"
                            ]
                        })
                }, {
                    test: /\.tpl$/,
                    include: [
                        path.join(__dirname, 'tpl'),
                        path.join(__dirname, 'dep/components')
                    ],
                    loader: 'tmodjs-loader'
                }, {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    //loader: 'url?limit=8192&name=img/[hash:8]-[name].[ext]'
                    loader: isDev ? 'url-loader?limit=100&name=img/[name].[ext]' : 'url-loader?limit=100&name=img/[name]-[hash:8].[ext]'
                }, {
                    test: /^es5-sham\.min\.js|es5-shim\.min\.js$/,
                    loader: 'babel-loader',
                    exclude: node_modules
                }, {
                    test: /\.html$/,
                    include: [
                        path.join(__dirname, 'src')
                    ],
                    //loader: 'html?minimize=false&interpolate=true',
                    loader: 'html-loader'
                }
            ]
        },
        plugins: (function () {
            var pluginsArr = [];
            if (isDev) {
                pluginsArr.push(cssExtractTextPlugin);
            } else {
                pluginsArr.push(
                    new webpack.optimize.UglifyJsPlugin({
                        output: {
                            comments: false
                        },
                        mangle: {
                            except: ['$', 'exports', 'require']
                        }
                    }), cssExtractTextPlugin);
            }
            return pluginsArr.concat(htmlPlugin);
        })(),

        externals: {
            'jquery': '$'
        }
    }
};