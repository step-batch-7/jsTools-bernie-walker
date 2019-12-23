const { assert } = require("chai");
const {
  sortContent,
  loadFileContent,
  parseContent
} = require("../src/sortContent");

describe("sortContent", function() {
  let fileSystem;

  beforeEach(function() {
    fileSystem = {
      readFileSync: fileName => `${fileName}a\nb\nc\n`,
      existsSync: path => !(path == "badFile")
    };
  });

  it("should return error message with error message writer when the input file is wrong", function() {
    const actual = sortContent.call({ fileSystem }, "badFile");
    const expected = {
      resultWriter: console.error,
      result: "sort: No such file or directory"
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should sort the contents of the given file as per ASCII value and return with writer", function() {
    fileSystem.readFileSync = () => "a\n''\n1\nB\ncd\n";
    const actual = sortContent.call({ fileSystem }, "file1");
    const expected = { resultWriter: console.log, result: "''\n1\nB\na\ncd" };
    assert.deepStrictEqual(actual, expected);
  });

  describe("loadFileContent", function() {
    it("should load the contents of the file if exists and fileExists should be false", function() {
      const actual = loadFileContent.call(fileSystem, "file1");
      const expected = { fileExists: true, fileContent: "file1a\nb\nc\n" };
      assert.deepStrictEqual(actual, expected);
    });

    it("should return empty string and fileExists should be false when file doesn't exist", function() {
      const actual = loadFileContent.call(fileSystem, "badFile");
      const expected = { fileExists: false, fileContent: "" };
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("parseContent", function() {
    it("should split the content into array", function() {
      const actual = parseContent("a\nb\nc");
      const expected = ["a", "b", "c"];
      assert.deepStrictEqual(actual, expected);
    });

    it("should trim the last new line of the content if exists", function() {
      const actual = parseContent("1\nab\nx\n");
      const expected = ["1", "ab", "x"];
      assert.deepStrictEqual(actual, expected);
    });
  });
});
