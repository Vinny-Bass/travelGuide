export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov",
  ],
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  maxWorkers: "50%",
};
