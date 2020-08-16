const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common')

const DIST_DIR = path.resolve(__dirname, '../dist')

module.exports = merge(common, {
  mode: 'development', // development模式
  output: {
    path: DIST_DIR,
    filename: 'assets/js/[name].[hash:8].js',
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 5000,
    historyApiFallback: true,
    contentBase: DIST_DIR,
    publicPath: '/',
    hot: true,
    // open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
