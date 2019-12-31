const generateError = function(code) {
  const lookup = {
    ENOENT: 'No such file or directory',
    EISDIR: 'Is a directory',
    EACCES: 'Permission denied'
  };

  return `sort: ${lookup[code]}`;
};

const loadFromFile = function(utils, fileName, callBack) {
  utils.readFile(fileName, 'utf8', (error, data) => {
    if (error) {
      utils.streamWriter.error(generateError(error.code));
      return;
    }

    callBack(utils.streamWriter.log, data.replace(/\n$/, '').split('\n'));
  });
};

const readStdin = function(utils, callBack) {
  let content = '';
  utils.stdin.setEncoding('utf8');

  utils.stdin.on('data', chunk => {
    content += chunk;
  });

  utils.stdin.on('end', () =>
    callBack(utils.log, content.replace(/\n$/, '').split('\n'))
  );
};

const loadContent = function(sortUtils, fileName, callBack) {
  const streamWriter = sortUtils.streamWriter;

  if (fileName === undefined) {
    const stdin = sortUtils.contentLoader.stdin;
    const log = streamWriter.log;
    readStdin({ stdin, log }, callBack);
    return;
  }

  const readFile = sortUtils.contentLoader.readFile;
  loadFromFile({ readFile, streamWriter }, fileName, callBack);
};

module.exports = { loadContent };
