const { readFileSync, existsSync } = require('fs');
const { sort } = require('./src/sortLib');

const main = function() {
  const userArgStart = 2;
  const fileSystem = { read: readFileSync, exists: existsSync };
  const streamWriter = {
    log: stream => process.stdout.write(`${stream}\n`),
    error: stream => process.stderr.write(`${stream}\n`)
  };

  sort(fileSystem, streamWriter, process.argv[userArgStart]);
};

main();
