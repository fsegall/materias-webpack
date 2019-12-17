const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack')
const extractCss = new ExtractTextPlugin({
  filename: 'main.css',
  disable: process.env.NODE_ENV === 'devlopment'
})

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  PAGES: path.resolve(__dirname, 'src/fixtures/pages')
}

// Webpack configuration
module.exports = {
  // entry: path.join(paths.JS, 'app.js'),
  // output: {
  //   path: paths.DIST,
  //   filename: '[name].[hash].bundle.js',
  // },
  entry: {
    polyfill: path.join(paths.JS, 'polyfill.js'),
    main: path.join(paths.JS, 'app.js')
  },
  output: {
    path: path.resolve('./dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  // devServer: {
  //   contentBase: 'src/', // Relative directory for base of server
  //   // publicPath: '/',
  //   publicPath: '/dist/',
  //   inline: true,
  //   port: process.env.PORT || 3000, // Port Number
  //   host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
  //   historyApiFallback: true,
  // },
  devServer: {
    contentBase: path.resolve('./src'),
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 3000,
    host: '127.0.0.1', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.join(paths.SRC, 'index.html'),
      hash: true
      // }),
      // new HtmlWebpackPlugin({
      //   title: 'Plenário e Comissões',
      //   filename: 'plenario-e-comissoes.html',
      //   template: path.join(paths.PAGES, 'plenario-e-comissoes.html'),
      //   inject:'body',
      //   hash:true,
      // }),
      // new ExtractTextPlugin('[name].[hash].css'),
    }),
    new ExtractTextPlugin('main.css'),
    extractCss,
    new webpack.DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'devlopment'
    })
  ],
  // Loaders configuration
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.sass|scss$/,
        use: extractCss.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [precss, autoprefixer]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less$/,
        use: extractCss.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
