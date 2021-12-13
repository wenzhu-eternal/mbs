const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require("craco-less");
const Jarvis = require("webpack-jarvis");
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve("src"),
    },
    plugins: [
      new Jarvis({
        watchOnly: false,
        port: 3001
      }),
      new HardSourceWebpackPlugin(),
      new ProgressBarPlugin(),
    ]
  },
  plugins: [
    { plugin: new ReactRefreshPlugin() },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1890ff',
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true },
        },
        modifyLessRule: function () {
          return {
            test: /\.module\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:6]',
                  },
                },
              },
              { loader: 'less-loader' },
            ],
          };
        },
      },
    },
  ],
}