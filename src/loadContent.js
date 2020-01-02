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

const readStdin = function(stdin, log, callBack) {
  let content = '';
  stdin.setEncoding('utf8');

  stdin.on('data', chunk => {
    content += chunk;
  });

  stdin.on('end', () => callBack(content, log));
};

module.exports = { loadFromFile, readStdin };
