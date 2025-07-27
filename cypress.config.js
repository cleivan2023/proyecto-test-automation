const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://test-adl.leonardojose.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      Email: "testeradl@test.com",
      Clave: "Tester@2025",

    },

    video: true,
    videoCompression: 32,

  },
});
