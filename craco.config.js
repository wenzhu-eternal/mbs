const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require("craco-less");
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve("src"),
    },
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