const { assert } = require("chai");
const { loadFileContent } = require("../src/loadContent");

describe("loadFileContent", function() {
  let fileSystem;

  beforeEach(function() {
    fileSystem = {
      reader: fileName => {
        if (fileName == "badFile") throw "error";
        return `a\nb\nc\n`;
      },
      encoding: "none"
    };
  });

  it("should load the contents of the file if exists", function() {
    const actual = loadFileContent.call(fileSystem, "file1");
    const expected = ["a", "b", "c"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should throw an error if path doesn't exist", function() {
    const actual = () => loadFileContent.call(fileSystem, "badFile");
    assert.throw(actual, "error");
  });

  it("should trim only the last new line of the content if exists", function() {
    fileSystem.reader = () => "1\nab\nx\n\n";
    const actual = loadFileContent.call(fileSystem, "file1");
    const expected = ["1", "ab", "x", ""];
    assert.deepStrictEqual(actual, expected);
  });
});
