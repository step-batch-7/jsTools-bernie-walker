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

    callBack(data, utils.streamWriter.log);
  });
};

const readStdin = function(utils, callBack) {
  let content = '';
  utils.stdin.setEncoding('utf8');

  utils.stdin.on('data', chunk => {
    content += chunk;
  });

  utils.stdin.on('end', () => callBack(content, utils.log));
};

module.exports = { loadFromFile, readStdin };
