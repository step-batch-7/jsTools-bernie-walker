const { assert } = require("chai");
const { loadContent } = require("../src/load_content");

describe("loadContent", function() {
  let context;

  beforeEach(function() {
    context = {
      fs: {
        readFileSync: file => {
          if (file == "newFile") return "content\n\n";
          return `${file}Content\n`;
        },
        existsSync: name => !(name == "badFile")
      }
    };
  });

  it("should load the contents of the given filenames when they exist", function() {
    const actual = loadContent.call(context, ["file1", "file2"]);
    const expected = ["file1Content", "file2Content"];
    assert.deepStrictEqual(actual, expected);
  });

  it("should return an empty array when there is at least one bad filename", function() {
    const actual = loadContent.call(context, ["file1", "badFile"]);
    assert.deepStrictEqual(actual, []);
  });

  it("should remove only one new line at the ending", function() {
    const actual = loadContent.call(context, ["newFile"]);
    assert.deepStrictEqual(actual, ["content\n"]);
  });
});
