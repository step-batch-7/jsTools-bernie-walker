const { assert } = require("chai");
const { handleOutput } = require("../src/output_handler");

describe("handleOutput", function() {
  let context;

  beforeEach(function() {
    context = { badFileError: false };
  });

  it("should return the error stream and no output error when some error flag is set", function() {
    context.badFileError = true;
    const actual = handleOutput.call(context, []);
    const expected = {
      errorStream: "sort: No such file or directory",
      outputStream: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return no error stream and appropriate output stream when no error flag is set", function() {
    const actual = handleOutput.call(context, ["abc", "def"]);
    const expected = { errorStream: "", outputStream: "abc\ndef" };
    assert.deepStrictEqual(actual, expected);
  });
});
