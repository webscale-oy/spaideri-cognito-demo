const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const COGNITO_IDENTITY_POOL_ID = '"<YOUR COGNITO IDENTIY POOL ID>"'
const AWS_REGION = '"eu-central-1"'
const FACEBOOK_APP_ID = '"<YOUR FACEBOOK APP ID>"'
const FACEBOOK_API_VERSION = '"v2.10"'

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: isProduction ? 'cognito-identity.build.[hash].js' : 'cognito-identity.build.js'
  },
  module: {
    rules: [
      {
        // enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.join(__dirname, '.eslintrc.js'),
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader', {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, './src/variables.scss')
              }
            }]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [path.join(__dirname,'./src')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ pkg, filename: 'index.html', template: 'index.html', inject: 'body' }),
    new webpack.DefinePlugin( { COGNITO_IDENTITY_POOL_ID, AWS_REGION, FACEBOOK_APP_ID, FACEBOOK_API_VERSION}),
    new webpack.LoaderOptionsPlugin({ minimize: isProduction })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: {
      index: '/'
    },
    noInfo: true,
    proxy: [{
      context: ['/api/v1/**'],
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false
    }]
  },
  performance: {
    hints: false
  },
  devtool: isProduction ? '#source-map' : '#eval-source-map'
}
