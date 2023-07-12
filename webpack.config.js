const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname);

const {presets} = require(`${rootDir}/babel.config.js`);
const webpackEnv = process.env.NODE_ENV || 'development';

console.log(path.join(rootDir, './index.js'));

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  // exclude: [path.resolve(appDirectory, 'node_modules/react-native-reanimated')],
  include: [
    path.resolve(__dirname, 'index.js'), // Entry to your application
    path.resolve(__dirname, 'App.tsx'), // Change this to your main App file
  ],

  use: {
    loader: 'babel-loader',
    options: {
      presets,
      cacheDirectory: true,
    },
  },
};

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.js'),
  },
  output: {
    path: path.resolve(rootDir, 'build'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: false,
  },
  module: {
    rules: [
      //   {
      //     test: /\.(tsx|ts|jsx|js|mjs)$/,
      //     exclude: /node_modules/,
      //     loader: 'ts-loader',
      //   },
      babelLoaderConfiguration,
      {
        test: /\.(gif|jpe?g|png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'web/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ], // read files in fillowing order
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
};
