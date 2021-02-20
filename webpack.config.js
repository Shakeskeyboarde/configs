const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Symbol used to add names to config array entries, which would
// otherwise be difficult to find for modification.
const ConfigSection = Symbol.for('ConfigSection');

// Source package.json quick config values.
const publicPath = process.env['npm_package_config_webpack_publicPath'] ?? '/';
const devServerPort = Math.max(0, Number.parseInt(process.env['npm_package_config_webpack_devServerPort'], 10)) || 3000;

/** @type {(env: Record<string, string | boolean | undefined>, argv: any) => import('webpack').Configuration} */
module.exports = (_env, argv) => {
  const mode = argv.mode || 'development';

  return {
    mode,
    entry: path.resolve('src'),
    output: {
      path: path.resolve('dist'),
      filename: 'bundle/[name].[chunkhash:8].js',
      publicPath,
    },
    stats: {
      all: false,
      assets: true,
      warnings: true,
      errors: true,
    },
    performance: { hints: false },
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
    },
    module: {
      rules: [
        {
          [ConfigSection]: 'rule.code',
          test: /\.([tj]sx?|json)$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          [ConfigSection]: 'rule.css',
          test: /\.(css)$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          [ConfigSection]: 'rule.image',
          test: /\.(png|svg|gif|webp|jpe?g|ico|tiff|bmp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: 'file-loader',
                name: 'bundle/[name].[contenthash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        minify: true,
        template: path.resolve('public/index.html'),
        favicon: path.resolve('public/favicon.png'),
        title: process.env['npm_package_config_webpack_title'] || 'Untitled',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            context: process.cwd(),
            from: 'public',
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['**/public/index.html', '**/public/favicon.png'],
            },
          },
        ],
      }),
      new CompressionPlugin({ algorithm: 'brotliCompress', filename: '[file].br' }),
      new CompressionPlugin({ algorithm: 'gzip', filename: '[file].gz' }),
      ...(mode === 'production'
        ? [
            new BundleAnalyzerPlugin({
              reportFilename: path.resolve('build-reports/bundle-analyzer.html'),
              analyzerMode: 'static',
              openAnalyzer: false,
            }),
          ]
        : []),
    ],
    devServer: {
      contentBase: path.resolve('public'),
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      host: '0.0.0.0',
      https: false,
      port: devServerPort,
      stats: 'minimal',
    },
  };
};
