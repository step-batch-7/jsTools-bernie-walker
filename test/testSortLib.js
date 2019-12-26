const { assert } = require("chai");
const { sort } = require("../src/sortLib");

describe("sort", function() {
  let fileSystem;

  beforeEach(function() {
    fileSystem = {
      read: file => {
        if (file == "empty") return "";
        return `a\nc\nB\n1\n`;
      },
      exists: fileName => fileName != "badFile"
    };
  });

  it("should generate error and writer pair given wrong file name", function() {
    const actual = sort(fileSystem, "badFile");
    const expected = {
      writer: console.error,
      result: "sort: No such file or directory"
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should generate the sorted result and writer pair when the path is right", function() {
    const actual = sort(fileSystem, "file1");
    const expected = { writer: console.log, result: "1\nB\na\nc" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should ignore only the last new line character of the file content", function() {
    fileSystem.read = () => "1\nab\nx\n\n";
    const actual = sort(fileSystem, "file1");
    const expected = { writer: console.log, result: "\n1\nab\nx" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should produce return the empty string when file content is empty", function() {
    const actual = sort(fileSystem, "empty");
    const expected = { writer: console.log, result: "" };
    assert.deepStrictEqual(actual, expected);
  });
});
