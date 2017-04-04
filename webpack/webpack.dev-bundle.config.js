import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const name = 'lml';

const config = {
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },
  entry: {
    'index': [
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'dist/'),
    publicPath: '',
    filename: 'index.js',
    libraryTarget: 'umd',
    library: `${name}-components`,
  },
  cache: true,
  debug: false,
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      'I': 'immutable',
    }),
  ],
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'css-loader?module' },
      { test: /\.less$/, loader: 'style!css!less', exclude: /node_modules/ },
      { test: /\.(png|jpe?g|gif|svg)$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.woff(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.woff2(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
      { test: /\.ttf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
      { test: /\.eot(\?.*)?$/,
        loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.svg(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
    ],
  },
  eslint: {
    quiet: true,
  },
};

export default config;
