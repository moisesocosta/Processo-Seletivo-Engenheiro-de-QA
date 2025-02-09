const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://auth.vagas.solides.com.br/sign-up",
    viewportWidth: 1920,
    viewportHeight: 1080,
    "chromeWebSecurity": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
