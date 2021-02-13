/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  roots: ['src'],
  verbose: true,
  timers: 'modern',
  restoreMocks: true,
  errorOnDeprecated: true,
  setupFilesAfterEnv: ['jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'json-summary', 'html'],
  coverageThreshold: {
    global: {
      functions: 0,
      branches: 0,
      lines: 0,
      statements: 0,
    },
  },
};
