const sortContent = function(fileLines) {
  return fileLines.sort().join("\n");
};

const loadFileContent = function(fileSystem, fileName) {
  if (!fileSystem.exists(fileName))
    return { error: "sort: No such file or directory" };
  const lines = fileSystem
    .read(fileName, "utf8")
    .replace(/\n$/, "")
    .split("\n");
  return { lines };
};

const sort = function(fileSystem, userArgs) {
  let writer, result;

  const fileContent = loadFileContent(fileSystem, userArgs);

  if (fileContent.error) {
    writer = "error";
    result = fileContent.error;
  } else {
    writer = "log";
    result = sortContent(fileContent.lines);
  }

  return { writer, result };
};

module.exports = { sort, sortContent, loadFileContent };
