var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\.spec.js$)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',

            // Could also be write as follow:
            // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
            use: [
                {
                    loader: 'css-loader',
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                },
                'postcss-loader'
            ]
        }),
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]" // translates CSS into CommonJS
      }, {
          loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css"
    }),
  ],
  resolve: {
    extensions: [".js"],
    modules: [
      __dirname,
      path.resolve(__dirname, "./node_modules")
    ]
  }
}