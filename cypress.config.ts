import {defineConfig} from "cypress";
import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: 'http://localhost:4200',
    supportFile: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});

// import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
// import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
// import * as createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// import {defineConfig} from 'cypress';
//
// async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
//   await addCucumberPreprocessorPlugin(on, config);
//   on('file:preprocessor', createBundler({plugins: [createEsbuildPlugin(config)],}));
// return config;
// },


// const { defineConfig } = require('cypress');
// const cucumber = require('@badeball/cypress-cucumber-preprocessor').default;
//
// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       cucumber(on, config);
//       return config;
//     },
//     specPattern: 'cypress/e2e/**/*.feature',
//     supportFile: false,
//   },
// });
