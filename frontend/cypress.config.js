const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //increased the timeout  from 8000 to 80000
  defaultCommandTimeout: 80000,
  viewportWidth: 1200,
  viewportHeight: 700,
  video: false,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.specPattern = [
        "cypress/e2e/login.cy.js",
        "cypress/e2e/patientEntry.cy.js",
        "cypress/e2e/orderEntity.cy.js",
        "cypress/e2e/workplan.cy.js",
        "cypress/e2e/nonConform.cy.js",
        "cypress/e2e/result.cy.js",
        "cypress/e2e/validation.cy.js",
        "cypress/e2e/modifyOrder.cy.js",
        "cypress/e2e/report.cy.js",
        "cypress/e2e/batchOrderEntry.cy.js",
        "cypress/e2e/dashboard.cy.js",
        "cypress/e2e/labNumberManagement.cy.js",
        "cypress/e2e/AdminE2E/MenuConfig/globalMenuConfig.cy.js",
      ];
      return config;
    },
    baseUrl: "https://localhost",
    testIsolation: false,
    env: {
      STARTUP_WAIT_MILLISECONDS: 300000,
    },
  },
});
