const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './src/index.ts',
  },
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: 'module',
    },
    libraryTarget: 'module',
    module: true,
    filename: '[name].mjs',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true,
  },
  devServer: {
    contentBase: './dist',
    injectClient: false,
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'), // Это разрешает алиас @app для Webpack
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
        },
        exclude: [/node_modules/, /cypress/],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
      files: 'src/index.ts',
    }),
  ],
};
