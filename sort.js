const { readFileSync } = require("fs");
const {
  sortContent,
  loadFileContent,
  generateError
} = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, encoding: "utf8" };

  try {
    const fileLines = loadFileContent(fileSystem, process.argv[2]);
    console.log(sortContent(fileLines));
  } catch (error) {
    console.error(generateError(error.code));
  }
};

main();
