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

class StreamWriter {
  constructor(stderr, stdout) {
    this.stderr = stderr;
    this.stdout = stdout;
  }

  write(error, result) {
    if (error) {
      this.stderr.write(`${error}\n`);
    } else {
      this.stdout.write(`${result}\n`);
    }
  }
}

module.exports = { StreamReader, StreamWriter };
