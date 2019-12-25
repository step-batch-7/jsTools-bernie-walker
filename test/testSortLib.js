const { assert } = require("chai");
const { sortContent, loadFileContent } = require("../src/sortLib");

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

describe("loadFileContent", function() {
  let fileSystem;

  beforeEach(function() {
    fileSystem = {
      read: fileName => {
        return `a\nb\nc\n`;
      },
      exists: fileName => !(fileName == "badFile")
    };
  });

  it("should load the lines of the file if exists", function() {
    const actual = loadFileContent(fileSystem, "file1");
    const expected = { lines: ["a", "b", "c"] };
    assert.deepStrictEqual(actual, expected);
  });

  it("should produce error if file doesn't exist", function() {
    const actual = loadFileContent(fileSystem, "badFile");
    const expected = { error: "sort: No such file or directory" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should trim only the last new line character of the content if present", function() {
    fileSystem.read = () => "1\nab\nx\n\n";
    const actual = loadFileContent(fileSystem, "file1");
    const expected = { lines: ["1", "ab", "x", ""] };
    assert.deepStrictEqual(actual, expected);
  });
});
