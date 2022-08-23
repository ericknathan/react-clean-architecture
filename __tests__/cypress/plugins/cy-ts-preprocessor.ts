import webpackPreprocessor from '@cypress/webpack-preprocessor';

export default webpackPreprocessor({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }]
    }
  }
});
