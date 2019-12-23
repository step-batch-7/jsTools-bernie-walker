const { readFileSync, existsSync } = require("fs");
const { sortContent } = require("./src/sortContent");

const main = function() {
  const fileSystem = { readFileSync, existsSync };
  const { resultWriter, result } = sortContent.call(
    { fileSystem },
    process.argv[2]
  );

  resultWriter(result);
};

main();
