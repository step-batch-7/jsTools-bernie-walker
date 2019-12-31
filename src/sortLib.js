const { loadContent } = require('./loadContent');

const sortContent = function(writer, lines) {
  writer(lines.sort().join('\n'));
};

const sort = function(sortUtils, userArgs) {
  loadContent(sortUtils, userArgs, sortContent);
};

module.exports = { sort };
