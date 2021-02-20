/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  roots: ['src'],
  verbose: true,
  restoreMocks: true,
  errorOnDeprecated: true,
  moduleNameMapper: {
    '\\.(css|png|svg|gif|webp|jpe?g|ico|tiff|bmp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
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
