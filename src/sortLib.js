const sortContent = function(lines) {
  return lines
    .replace(/\n$/, '')
    .split('\n')
    .sort()
    .join('\n');
};

const generateError = function(code) {
  const lookup = {
    ENOENT: 'No such file or directory',
    EISDIR: 'Is a directory',
    EACCES: 'Permission denied'
  };

  return `sort: ${lookup[code]}`;
};

const sort = function(fileName, streamReader, streamWriter) {
  let lines = '';
  const stream = streamReader.read(fileName);

  stream.on('error', error => {
    const errorMessage = generateError(error.code);
    streamWriter.write(errorMessage);
  });

  stream.on('data', chunk => {
    lines += chunk;
  });

  stream.on('end', () => {
    const result = sortContent(lines);
    streamWriter.write(null, result);
  });
};

module.exports = { sort };
