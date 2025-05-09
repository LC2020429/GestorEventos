const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

module.exports = {
  setupFilesAfterEnv: ["./setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
  