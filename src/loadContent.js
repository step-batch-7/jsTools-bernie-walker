const generateError = function(code) {
  const lookup = {
    ENOENT: 'No such file or directory',
    EISDIR: 'Is a directory',
    EACCES: 'Permission denied'
  };

  return `sort: ${lookup[code]}`;
};

const loadFromFile = function(fileName, utils, callBack) {
  utils.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      utils.streamWriter.error(generateError(error.code));
      return;
    }

    callBack(data.replace(/\n$/, '').split('\n'), utils.streamWriter.log);
  });
};

const readStdin = function(utils, callBack) {
  let content = '';
  utils.stdin.setEncoding('utf8');

  utils.stdin.on('data', chunk => {
    content += chunk;
  });

  utils.stdin.on('end', () =>
    callBack(content.replace(/\n$/, '').split('\n'), utils.log)
  );
};

const loadContent = function(fileName, sortUtils, callBack) {
  const streamWriter = sortUtils.streamWriter;
  const stdin = sortUtils.contentLoader.stdin;
  const log = streamWriter.log;
  const readFile = sortUtils.contentLoader.readFile;

  if (fileName) {
    loadFromFile(fileName, { readFile, streamWriter }, callBack);
  } else {
    readStdin({ stdin, log }, callBack);
  }
};

module.exports = { loadContent };
