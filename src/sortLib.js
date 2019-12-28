const sortContent = function(fileLines) {
  return fileLines.sort().join('\n');
};

const loadFileContent = function(fileSystem, fileName) {
  if (!fileSystem.exists(fileName)) {
    return { error: 'sort: No such file or directory' };
  }
  const lines = fileSystem
    .read(fileName, 'utf8')
    .replace(/\n$/, '')
    .split('\n');
  return { lines };
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
