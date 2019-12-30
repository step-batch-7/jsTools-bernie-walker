const loadContent = function(sortUtils, fileName, callBack) {
  sortUtils.contentLoader.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      sortUtils.streamWriter.error('sort: No such file or directory');
      return;
    }

    callBack(sortUtils.streamWriter.log, data.replace(/\n$/, '').split('\n'));
  });
};
module.exports = { loadContent };
