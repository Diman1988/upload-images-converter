const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './src/index.ts',
    wrapper: './src/wrapper.ts'
  },
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: 'module'
    },
    libraryTarget: 'module',
    module: true,
    filename: '[name].mjs',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true
  },
  devServer: {
    contentBase: "./dist",
    injectClient: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
          { from: 'src/index.html' }
      ]
  }),
  ],
};