const sortContent = function(fileLines) {
  return fileLines.sort().join("\n");
};

const parseContent = function(fileContent) {
  return fileContent.replace(/\n$/, "").split("\n");
};

const loadFileContent = function(fileName) {
  const fileContent = this.reader(fileName, this.encoding);
  return parseContent(fileContent);
};

const generateError = function(errorCode) {
  const errorCollection = {
    ENOENT: "sort: No such file or directory",
    ERR_INVALID_ARG_TYPE: "Error: invalid argument"
  };
  return errorCollection[errorCode];
};

module.exports = { sortContent, loadFileContent, generateError };
