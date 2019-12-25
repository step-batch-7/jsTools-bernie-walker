const { readFileSync, existsSync } = require("fs");
const { sortContent, loadFileContent } = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, exists: existsSync };
  const fileContent = loadFileContent(fileSystem, process.argv[2]);

  fileContent.error && console.error(fileContent.error);
  fileContent.lines && console.log(sortContent(fileContent.lines));
};

main();
