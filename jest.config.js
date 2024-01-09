module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./service", "./helpers", "./e2e"],
  testMatch: ["**/*.test.ts"],
};
