import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config = {
  mode: 'development',
  context: path.join(__dirname, 'src', 'js'),
  entry: {
    background: './background.js',
    content: './content.js',
    options: './options.js',
    popup: './popup.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/manifest.json',
        to: './manifest.json',
        context: path.join(__dirname)
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new CleanWebpackPlugin()
  ]
};

export default config;
