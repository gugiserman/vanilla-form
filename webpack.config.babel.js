import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import glob from 'glob'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'

const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV)

const PUBLIC_PATH = '/'
const OUTPUT_PATH = path.join(__dirname, '/dist')
const DEV_SERVER_PORT = 80

module.exports = {
  entry: removeEmpty([
    ...ifDevelopment([
      `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server',
    ]),
    './src/index.js',
  ]),

  output: {
    filename: `index${ifDevelopment('.js', '.min.js')}`,
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }, {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /.*\.svg$/,
        use: [
          'url-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['url-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      assets: path.join(__dirname, '/src/assets'),
    },
  },

  plugins: removeEmpty([
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '/src/index.html'),
      env: ifDevelopment('development', 'production'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          ifDevelopment('development', 'production')
        ),
      },
    }),
    ...ifDevelopment([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]),
    ...ifProduction([
      new webpack.optimize.AggressiveMergingPlugin(),
    ]),
  ]),

  devServer: {
    hot: true,
    disableHostCheck: true,
    port: DEV_SERVER_PORT,
    publicPath: PUBLIC_PATH,
  },
}
