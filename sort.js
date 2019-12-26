const { readFileSync, existsSync } = require("fs");
const { performSort } = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, exists: existsSync };

  const sorted = performSort(fileSystem, process.argv[2]);

  console[sorted.writer](sorted.result);
};

main();
