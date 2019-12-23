const handleOutput = function(outputArray) {
  let outputFunction = console.log;
  let outputStream = outputArray.join("\n");

  if (this.badFileError) {
    outputFunction = console.error;
    outputStream = "sort: No such file or directory";
  }

  return { outputFunction, outputStream };
};

module.exports = { handleOutput };
