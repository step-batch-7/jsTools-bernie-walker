class StreamReader {
  constructor(createReadStream, stdin) {
    this.createReadStream = createReadStream;
    this.stdin = stdin;
  }

  read(fileName) {
    if (fileName) {
      return this.createReadStream('fileName', { encoding: 'utf8' });
    }

    this.stdin.setEncoding('utf8');
    return this.stdin;
  }
}

module.exports = { StreamReader };
