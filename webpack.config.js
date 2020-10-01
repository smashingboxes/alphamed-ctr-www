module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        extensions: [ '.js', '.jsx']
      }
    ]
  }
};
