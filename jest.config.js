module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ["ts", "js"],
  //testMatch: ['tests/*.test.ts', '**/test.ts'],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};