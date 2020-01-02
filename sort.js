const { stdin, stdout, stderr } = process;
const { readFile } = require('fs');
const { sort } = require('./src/sortLib');

const main = function() {
  const contentLoader = { readFile, getStdin: () => stdin };
  const streamWriter = {
    log: stream => stdout.write(`${stream}\n`),
    error: stream => stderr.write(`${stream}\n`)
  };

  const [, , fileName] = process.argv;
  sort(fileName, { contentLoader, streamWriter });
};

main();
