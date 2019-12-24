const { readFileSync } = require("fs");
const {
  sortContent,
  loadFileContent,
  generateError
} = require("./src/sortLib");

const main = function() {
  const fileSystem = { reader: readFileSync, encoding: "utf8" };

  try {
    const fileLines = loadFileContent.call(fileSystem, process.argv[2]);
    console.log(sortContent(fileLines));
  } catch (error) {
    console.error(generateError(error.code));
  }
};

main();
