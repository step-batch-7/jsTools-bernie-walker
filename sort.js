const { readFile } = require('fs');
const { sort } = require('./src/sortLib');

const main = function() {
  const userArgStart = 2;
  const contentLoader = { readFile };
  const streamWriter = {
    log: stream => process.stdout.write(`${stream}\n`),
    error: stream => process.stderr.write(`${stream}\n`)
  };

  sort({ contentLoader, streamWriter }, process.argv[userArgStart]);
};

main();
