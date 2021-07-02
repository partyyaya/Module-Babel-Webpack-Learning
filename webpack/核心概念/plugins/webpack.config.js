const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        // 删除 html 中的註釋
        removeComments: true,
        // 删除 html 中的空格
        collapseWhitespace: true,
        // 删除 html 標籤的雙引號
        removeAttributeQuotes: true,
        // 將 html 文件內的 css 壓縮
        minifyCSS: true,
        // 將 html 文件內的 js 壓縮
        minifyJS: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './search.html',
      filename: 'search.html',
      chunks: ['search']
    })
  ]
};
