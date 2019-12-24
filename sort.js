const { readFileSync } = require("fs");
const { loadFileContent } = require("./src/loadContent");
const { generateError } = require("./src/sortUtils");
const { sortContent } = require("./src/sortContent");

const main = function() {
  const fileSystem = { reader: readFileSync, encoding: "utf8" };

  try {
    const fileLines = loadFileContent.call(fileSystem, process.argv[2]);
    console.log(sortContent(fileLines));
  } catch (error) {
    console.log(generateError(error.code));
  }
};

main();
