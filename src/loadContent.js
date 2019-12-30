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

module.exports = { loadFileContent };
