const sortContent = function(fileLines) {
  return fileLines.sort().join("\n");
};

const loadFileContent = function(fileSystem, fileName) {
  const fileContent = fileSystem.read(fileName, fileSystem.encoding);
  return fileContent.replace(/\n$/, "").split("\n");
};

const generateError = function(errorCode) {
  const errorCollection = {
    ENOENT: "sort: No such file or directory",
    ERR_INVALID_ARG_TYPE: "Error: invalid argument"
  };
  return errorCollection[errorCode];
};

module.exports = { sortContent, loadFileContent, generateError };
