const { loadFromFile, readStdin } = require('./loadContent');

const sortContent = function(lines, writer) {
  writer(
    lines
      .replace(/\n$/, '')
      .split('\n')
      .sort()
      .join('\n')
  );
};

const sort = function(fileName, contentLoader, streamWriter) {
  const stdin = contentLoader.getStdin();
  const log = streamWriter.log;
  const readFile = contentLoader.readFile;

  if (fileName) {
    loadFromFile(fileName, { readFile, streamWriter }, sortContent);
  } else {
    readStdin(stdin, log, sortContent);
  }
};

module.exports = { sort };
