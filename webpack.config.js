const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Symbol used to add names to config array entries, which would
// otherwise be difficult to find for modification.
const ConfigSection = Symbol.for('ConfigSection');

// Source package.json quick config values.
const publicPath = process.env['npm_package_config_webpack_publicPath'] ?? '/';
const devServerPort = Math.max(0, Number.parseInt(process.env['npm_package_config_webpack_devServerPort'], 10)) || 3000;

/** @type {(env: Record<string, string | boolean | undefined>, argv: any) => import('webpack').Configuration} */
module.exports = (_env, argv) => ({
  // This can be overridden on the command line (--mode=production).
  mode: 'development',
  entry: path.resolve('src'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle/[name].[chunkhash:8].js',
    publicPath,
  },
  performance: { hints: false },
  devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
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
      minify: false,
      template: path.resolve('public/index.html'),
    }),
    new CompressionPlugin({ algorithm: 'brotliCompress', filename: '[file].br' }),
    new CompressionPlugin({ algorithm: 'gzip', filename: '[file].gz' }),
    ...(argv.mode === 'production'
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
});
