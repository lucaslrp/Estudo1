const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.automationtesting.in/',
    //viewportWidth: 1920,
    //viewportHeight: 1080,
  }

  /* Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
    });*/

});