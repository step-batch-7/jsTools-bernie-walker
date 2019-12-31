const { loadContent } = require('./loadContent');

const sortContent = function(lines, writer) {
  writer(lines.sort().join('\n'));
};

const sort = function(userArgs, sortUtils) {
  loadContent(sortUtils, userArgs, sortContent);
};

module.exports = { sort };
