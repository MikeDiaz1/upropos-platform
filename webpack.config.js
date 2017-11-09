var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'webpack-dev-server';

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CopyWebpackPlugin([{ from: './public'}]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
]

const loaderOptionsConfig = {};
const devConfig = {};
if (env === 'production') {
  loaderOptionsConfig.minimize = true;
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  )
} else if (env === 'webpack-dev-server') {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
  devConfig.devtool = 'cheap-module-source-map';
  devConfig.entry = [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/index.js'
  ];
  devConfig.devServer = {
    compress: true,
    contentBase: path.resolve('./dist'),
    publicPath: '/',
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true,
    port: 5050
  };
}

plugins.push(new webpack.LoaderOptionsPlugin(loaderOptionsConfig));

module.exports = Object.assign({
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'index.min.js',
    publicPath: '/'
  },
  plugins,
  module: {
    loaders: [
      {
        exclude: ['/node_modules/', '/src/dev.js/'],
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(sass|scss)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /.(svg|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  }
}, devConfig);