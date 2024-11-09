module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest-polyfill-globalthis.js'],
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };