const { createReadStream } = require('fs');
const { StreamReader, StreamWriter } = require('./src/sortUtils');
const { sort } = require('./src/sortLib');

const main = function() {
  const streamReader = new StreamReader(createReadStream, process.stdin);
  const streamWriter = new StreamWriter(process.stderr, process.stdout);

  const [, , fileName] = process.argv;
  sort(fileName, streamReader, streamWriter);
};

main();
