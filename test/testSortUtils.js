const { assert } = require("chai");
const { generateError } = require("../src/sortUtils");

describe("generateError", function() {
  it("should generate the error message for bad file path", function() {
    const actual = generateError("ENOENT");
    const expected = "sort: No such file or directory";
    assert.strictEqual(actual, expected);
  });
  it("should generate the error for invalid argument", function() {
    const actual = generateError("ERR_INVALID_ARG_TYPE");
    const expected = "Error: invalid argument";
    assert.strictEqual(actual, expected);
  });
});
