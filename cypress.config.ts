import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import path from 'path';

export default defineConfig({
  e2e: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    testIsolation: true,
    setupNodeEvents(on, config) {
      // Configure webpack preprocessor with @app alias
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
              '@app': path.resolve(__dirname, 'src/'),
            },
          },
          module: {
            rules: [
              {
                test: /\.(ts|tsx)$/,
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                    },
                  },
                ],
                exclude: /node_modules/,
              },
            ],
          },
        },
        watchOptions: {},
      };

      on('file:preprocessor', webpackPreprocessor(options));
    },
  },
});
