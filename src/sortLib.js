const { loadFileContent } = require('./loadContent');

const sortContent = function(fileLines) {
  return fileLines.sort().join('\n');
};

const sort = function(fileSystem, streamWriter, userArgs) {
  const fileContent = loadFileContent(fileSystem, userArgs);

  if (fileContent.error) {
    streamWriter.error(fileContent.error);
    return;
  }

  streamWriter.log(sortContent(fileContent.lines));
};

module.exports = { sort };
