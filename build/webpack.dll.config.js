/**
 *  Created by   阿紫
 *  On  2018/5/8
 *  Content
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('../config');
const utils = require('./utils');

module.exports = {
  // 要打包的模块的数组
  entry: {
    vendor: [
      'vue/dist/vue.runtime.esm.js',
      'vuex',
      'vue-router',
      'element-ui',
      'axios',
      // 'normalize.css',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../static/dll'),  // 打包后文件输出的位置
    filename: '[name].dll.js', // vendor.dll.js中暴露出的全局变量名。
    library: '[name]_library' // 与webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/dll', '[name]-manifest.json'),
      name: '[name]_library',
    }),
    new ExtractTextPlugin('../css/[name].css'),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
  ],
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: tru1e,
      usePostCSS: true,
    }),
  },
};


