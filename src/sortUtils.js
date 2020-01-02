class StreamReader {
  constructor(createReadStream, stdin) {
    this.createReadStream = createReadStream;
    this.stdin = stdin;
  }

  read(fileName) {
    if (fileName) {
      return this.createReadStream('fileName', { encoding: 'utf8' });
    }
  }
}

module.exports = { StreamReader };
