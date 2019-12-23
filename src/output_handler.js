const handleOutput = function(outputArray) {
  const errorStream =
    (this.badFileError && "sort: No such file or directory") || "";
  const outputStream = outputArray.join("\n");
  return { errorStream, outputStream };
};

module.exports = { handleOutput };
