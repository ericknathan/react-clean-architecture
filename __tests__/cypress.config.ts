import { defineConfig } from "cypress";
import webpackConfig from '../webpack.config';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: './cypress/fixtures',
    supportFile: './cypress/support/index.ts',
    specPattern: './cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});
