const TerserPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name]_[contenthash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      cache: true,
    }),
    new OptimizeCssAssetsPlugin(),
  ],
})
