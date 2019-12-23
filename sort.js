const fs = require("fs");
const { sortContent } = require("./src/sort_content");
const { loadContent } = require("./src/load_content");

const main = function() {
  const context = { fs };
  const content = loadContent.call(context, process.argv.slice(2));
  const sortedContent = sortContent(content);

  console.log(sortedContent.join("\n"));
};

main();
