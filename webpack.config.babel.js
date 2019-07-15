import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'

const config = {
  mode: 'development',
  context: path.join(__dirname, 'src'),
  entry: {
    background: './js/background.js',
    content: './js/content.js',
    options: './js/options.js',
    popup: './js/popup.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/manifest.json',
        to: './manifest.json',
        context: path.join(__dirname)
      }
    ])
  ]
}

export default config
