import cypressTypeScriptPreprocessor from './cy-ts-preprocessor';

export default (on: Cypress.PluginEvents) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};
