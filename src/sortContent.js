const sortContent = function(fileLines) {
  return fileLines.sort().join("\n");
};

module.exports = { sortContent };
