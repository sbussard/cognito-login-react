import process from 'process';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';

// setup environment variables =================================================

const ENVIRONMENT = process.env; // eslint-disable-line no-process-env
const NODE_ENV = ENVIRONMENT.NODE_ENV || 'production';
const AWS_REQUIRED_VARIABLES = [
  'AWS_REGION',
  'AWS_COGNITO_USER_POOL_ID',
  'AWS_COGNITO_USER_POOL_CLIENT_ID',
  'AWS_COGNITO_FEDERATED_IDENTITY_POOL_ID',
  'AWS_COGNITO_FEDERATED_IDENTITY_TOKEN'
];

let findMissingVariable = (variable) => Object.keys(ENVIRONMENT).indexOf(variable) === -1;
let missingVariables = AWS_REQUIRED_VARIABLES.filter(findMissingVariable);

if (missingVariables.length > 0) {
  let sep = '\n\t> ';
  throw new Error(`Missing environment variables: \n${sep}${missingVariables.join(sep)}\n`);
}

let toEnvironmentVariableJsonMap = (variableName) => ({
  [variableName]: JSON.stringify(ENVIRONMENT[variableName])
});

let shallowMerge = (previous, current) => ({...previous, ...current});

const AWS_SETTINGS = AWS_REQUIRED_VARIABLES
  .map(toEnvironmentVariableJsonMap)
  .reduce(shallowMerge, {});

// loaders =====================================================================

let babelLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel'
};

let scssLoader = {
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: [
    'style?insertAt=top',
    'css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:4]',
    'sass'
  ]
};

let jsonLoader = {
  test: /\.json$/,
  loader: 'json'
};

let imageLoader = {
  test: /\.png$/,
  loader: 'file-loader'
};

// plugins =====================================================================

let templatePlugin = new HtmlWebpackPlugin({
  template: path.resolve('src', 'index.html'),
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});

let occurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
let dedupePlugin = new webpack.optimize.DedupePlugin();

let setAWSConfigPlugin = new webpack.DefinePlugin({AWS_SETTINGS});

let setProdEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

/* eslint-disable camelcase */

let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    screw_ie8: true,
    warnings: false
  },
  minimize: true,
  mangle: {
    screw_ie8: true
  },
  output: {
    comments: false,
    screw_ie8: true
  }
});

/* eslint-enable camelcase */

let momentIgnoreLocalesPlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
let vendorsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js');
let dashboardPlugin = new DashboardPlugin();
let hotReloaderPlugin = new webpack.HotModuleReplacementPlugin();

// config ======================================================================

let config = {
  entry: {
    vendors: [
      'aws-sdk/global',
      'amazon-cognito-identity-js',
      'classnames',
      'immutable',
      'moment',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'uuid'
    ],
    app: path.resolve('src', 'app.jsx')
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      theme: path.resolve('src', 'theme')
    }
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    setAWSConfigPlugin,
    setProdEnvPlugin, // used mostly by third-party libs
    templatePlugin,
    occurrenceOrderPlugin,
    momentIgnoreLocalesPlugin,
    vendorsPlugin,
    dedupePlugin,
    uglifyJsPlugin
  ],
  module: {
    loaders: [
      babelLoader,
      scssLoader,
      jsonLoader,
      imageLoader
    ]
  }
};

if (NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
  config.entry.hot = [
    'webpack-dev-server/client?http://0.0.0.0:7000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
  ];
  config.plugins = [
    setAWSConfigPlugin,
    templatePlugin,
    occurrenceOrderPlugin,
    momentIgnoreLocalesPlugin,
    vendorsPlugin,
    dashboardPlugin,
    hotReloaderPlugin
  ];
}

export default config;
