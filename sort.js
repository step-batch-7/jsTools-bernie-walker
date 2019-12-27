const { readFileSync, existsSync } = require("fs");
const { sort } = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, exists: existsSync };
  const streamWriter = { log: console.log, error: console.error };

  sort(fileSystem, streamWriter, process.argv[2]);
};

main();
