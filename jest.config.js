module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/pages/router/**/*',
    '!<rootDir>/src/helpers/**/*',
    '!**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/__tests__/$1',
    '@/mocks/(.*)': '<rootDir>/__mocks__/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  },
  resetMocks: false,
  testMatch: [
    "**/__tests__/**",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/cypress",
    "<rootDir>/__tests__/presentation/helpers",
  ]
}