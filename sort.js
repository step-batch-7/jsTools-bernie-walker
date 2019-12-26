const { readFileSync, existsSync } = require("fs");
const { sort } = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, exists: existsSync };

  const sortedLines = sort(fileSystem, process.argv[2]);

  sortedLines.writer(sortedLines.result);
};

main();
