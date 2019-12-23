const { assert } = require("chai");
const { handleOutput } = require("../src/output_handler");

describe("handleOutput", function() {
  let context;

  beforeEach(function() {
    context = { badFileError: false };
  });

  it("should return the appropriate error stream and output function when some error flag is set", function() {
    context.badFileError = true;
    const actual = handleOutput.call(context, []);
    const expected = {
      outputFunction: console.error,
      outputStream: "sort: No such file or directory"
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should return appropriate output stream and output function when no error flag is set", function() {
    const actual = handleOutput.call(context, ["abc", "def"]);
    const expected = { outputFunction: console.log, outputStream: "abc\ndef" };
    assert.deepStrictEqual(actual, expected);
  });
});
