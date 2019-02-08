module.exports = {
  entry: './src/index.js',

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.(png|jpg|gif|svg|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
};
