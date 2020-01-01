const { loadFromFile, readStdin } = require('./loadContent');

const sortContent = function(lines, writer) {
  writer(lines.sort().join('\n'));
};

const sort = function(userArgs, sortUtils) {
  const streamWriter = sortUtils.streamWriter;
  const stdin = sortUtils.contentLoader.stdin;
  const log = streamWriter.log;
  const readFile = sortUtils.contentLoader.readFile;

  if (userArgs) {
    loadFromFile(userArgs, { readFile, streamWriter }, sortContent);
  } else {
    readStdin({ stdin, log }, sortContent);
  }
};

module.exports = { sort };
