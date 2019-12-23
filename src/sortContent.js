const parseContent = function(fileContent) {
  return fileContent.replace(/\n$/, "").split("\n");
};

const loadFileContent = function(fileName) {
  let fileExists = false;
  let fileContent = "";

  if (this.existsSync(fileName)) {
    fileExists = true;
    fileContent = this.readFileSync(fileName, "utf8");
  }

  return { fileExists, fileContent };
};

const sortContent = function(fileName) {
  let resultWriter = console.error;
  let result = "sort: No such file or directory";

  const { fileExists, fileContent } = loadFileContent.call(
    this.fileSystem,
    fileName
  );

  if (fileExists) {
    const parsedContent = parseContent(fileContent);

    resultWriter = console.log;
    result = parsedContent.sort().join("\n");
  }

  return { resultWriter, result };
};

module.exports = { sortContent, loadFileContent, parseContent };
