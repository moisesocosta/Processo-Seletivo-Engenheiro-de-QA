const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://prd-pc1.lg.com.br/Vagas/c/14E91D1E-3320-4B26-84F9-F5C0345F5B12/p/PortalCarreirasMV/pt-BR/Usuario/Cadastro",
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
