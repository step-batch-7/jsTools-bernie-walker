const { loadContent } = require('./loadContent');

const sortContent = function(lines, writer) {
  writer(lines.sort().join('\n'));
};

const sort = function(userArgs, sortUtils) {
  loadContent(userArgs, sortUtils, sortContent);
};

module.exports = { sort };
