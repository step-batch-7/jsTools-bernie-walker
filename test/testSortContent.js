const { assert } = require("chai");
const { sortContent } = require("../src/sortContent");

describe("sortContent", function() {
  let lines;
  beforeEach(function() {
    lines = ["a", "1", "", "B", "cd"];
  });

  it("should sort the contents of the given file as per ASCII value and return with writer", function() {
    const actual = sortContent(lines);
    const expected = "\n1\nB\na\ncd";
    assert.strictEqual(actual, expected);
  });

  it("should return an empty string when no content is present ", function() {
    const actual = sortContent([]);
    assert.deepStrictEqual(actual, "");
  });
});
