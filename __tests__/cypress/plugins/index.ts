import cypressTypeScriptPreprocessor from './cy-ts-preprocessor';

export default on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};
