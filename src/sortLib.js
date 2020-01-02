const { loadFromFile, readStdin } = require('./loadContent');

const sortContent = function(lines, writer) {
  writer(lines.sort().join('\n'));
};

const sort = function(fileName, sortUtils) {
  const streamWriter = sortUtils.streamWriter;
  const stdin = sortUtils.contentLoader.getStdin();
  const log = streamWriter.log;
  const readFile = sortUtils.contentLoader.readFile;

  if (fileName) {
    loadFromFile(fileName, { readFile, streamWriter }, sortContent);
  } else {
    readStdin({ stdin, log }, sortContent);
  }
};

module.exports = { sort };
