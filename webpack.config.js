const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: 'module'
    },
    filename: 'index.mjs',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    clean: true
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
};