const { assert } = require("chai");
const { sortContent } = require("../src/sort_content");

describe("sortContent", function() {
  it("should sort the content of the array as per ASCII value", function() {
    const actual = sortContent(["a\n1\nB\nc"]);
    const expected = ["1\nB\na\nc"];
    assert.deepStrictEqual(actual, expected);
  });
});
