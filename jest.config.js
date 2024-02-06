module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  transformIgnorePatterns: [],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}