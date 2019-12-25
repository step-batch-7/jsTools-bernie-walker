const { readFileSync, existsSync } = require("fs");
const { getResultAndWriter } = require("./src/sortLib");

const main = function() {
  const fileSystem = { read: readFileSync, exists: existsSync };

  const resultAndWriter = getResultAndWriter(fileSystem, process.argv[2]);

  resultAndWriter.writer(resultAndWriter.result);
};

main();
