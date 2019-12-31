const { stdin, stdout, stderr } = process;
const { readFile } = require('fs');
const { sort } = require('./src/sortLib');

const main = function() {
  const userArgStart = 2;
  const contentLoader = { readFile, stdin };
  const streamWriter = {
    log: stream => stdout.write(`${stream}\n`),
    error: stream => stderr.write(`${stream}\n`)
  };

  sort({ contentLoader, streamWriter }, process.argv[userArgStart]);
};

main();
