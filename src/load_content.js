const loadContent = function(fileNames) {
  if (fileNames.some(fileName => !this.fs.existsSync(fileName))) {
    this.badFileError = true;
    return [];
  }
  return fileNames.map(fileName =>
    this.fs.readFileSync(fileName, "utf8").replace(/\n$/, "")
  );
};

module.exports = { loadContent };