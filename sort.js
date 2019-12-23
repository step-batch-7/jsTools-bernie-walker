const fs = require("fs");
const { sortContent } = require("./src/sort_content");
const { loadContent } = require("./src/load_content");
const { handleOutput } = require("./src/output_handler");

const main = function() {
  const context = { fs, badFileError: false };
  const content = loadContent.call(context, process.argv.slice(2));
  const sortedContent = sortContent(content);

  const { errorStream, outputStream } = handleOutput.call(
    context,
    sortedContent
  );

  outputStream && console.log(outputStream);
  errorStream && console.error(errorStream);
};

main();
