module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/__tests__/$1',
    '@/mocks/(.*)': '<rootDir>/__mocks__/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}