const generateError = function(code) {
  const lookup = {
    ENOENT: 'No such file or directory',
    EISDIR: 'Is a directory',
    EACCES: 'Permission denied'
  };

  return `sort: ${lookup[code]}`;
};

const loadContent = function(sortUtils, fileName, callBack) {
  sortUtils.contentLoader.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      sortUtils.streamWriter.error(generateError(error.code));
      return;
    }

    callBack(sortUtils.streamWriter.log, data.replace(/\n$/, '').split('\n'));
  });
};
module.exports = { loadContent };
