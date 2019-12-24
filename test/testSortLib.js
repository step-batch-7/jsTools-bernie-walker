const { assert } = require("chai");
const {
  sortContent,
  loadFileContent,
  generateError
} = require("../src/sortLib");

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
        if (fileName == "badFile") throw "error";
        return `a\nb\nc\n`;
      },
      encoding: "none"
    };
  });

  it("should load the contents of the file if exists", function() {
    const actual = loadFileContent(fileSystem, "file1");
    const expected = ["a", "b", "c"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should throw an error if path doesn't exist", function() {
    const actual = () => loadFileContent(fileSystem, "badFile");
    assert.throw(actual, "error");
  });

  it("should trim only the last new line of the content if exists", function() {
    fileSystem.read = () => "1\nab\nx\n\n";
    const actual = loadFileContent(fileSystem, "file1");
    const expected = ["1", "ab", "x", ""];
    assert.deepStrictEqual(actual, expected);
  });
});

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
