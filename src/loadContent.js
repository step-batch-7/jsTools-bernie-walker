const parseContent = function(fileContent) {
  return fileContent.replace(/\n$/, "").split("\n");
};

const loadFileContent = function(fileName) {
  const fileContent = this.reader(fileName, this.encoding);
  return parseContent(fileContent);
};

module.exports = { loadFileContent };
