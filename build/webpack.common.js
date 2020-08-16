const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const resolve = url => path.join(__dirname, '..', url)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: resolve('src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [resolve('src'), 'node_modules'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
        },
        common: {
          name: 'common',
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'React webpack config',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
    }),
    new ManifestPlugin(),
    new WebpackBar({
      name: `正在${isDev ? '启动' : '打包'}`,
    }),
    new HardSourceWebpackPlugin(),
  ],
}
