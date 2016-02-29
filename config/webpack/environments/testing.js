'use strict';

// Depends
var path = require('path');
var webpack = require('webpack');

module.exports = function(_path) {
  var rootAssetPath = './app/assets';
  return {
    cache: true,
    devtool: 'inline-source-map',
    // resolves modules
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules'],
      alias: {
        _svg:         path.join(_path, 'app', 'assets', 'svg'),
        _data:        path.join(_path, 'app', 'data'),
        _fonts:       path.join(_path, 'app', 'assets', 'fonts'),
        _modules:     path.join(_path, 'app', 'modules'),
        _images:      path.join(_path, 'app', 'assets', 'images'),
        _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
        _templates:   path.join(_path, 'app', 'assets', 'templates')
      }
    },
    module: {
      preLoaders: [
        {
          test: /.spec\.js$/,
          include: /src/,
          exclude: /(bower_components|node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },
        {
          test: /\.js?$/,
          include: /app\/assets\/javascripts\/core/,
          exclude: /(node_modules|__tests__)/,
          loader: 'babel-istanbul',
          query: {
            cacheDirectory: true,
          },
        },
      ],
      loaders: [
        // es6 loader
        {
          include: path.join(_path, 'app', 'assets', 'javascripts', 'core'),
          loader: 'babel-loader',
          exclude: /(node_modules|__tests__)/,
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          }
        },

        // jade templates
        {
          test: /\.jade$/,
          loader: 'jade-loader'
        },

        // stylus loader
        {
          test: /\.styl$/,
          loader: 'style!css!stylus'
        },

        // external files loader
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/i,
          loader: 'file',
          query: {
            context: rootAssetPath,
            name: '[path][hash].[name].[ext]'
          }
        }
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  };
};
