import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    testIsolation: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
