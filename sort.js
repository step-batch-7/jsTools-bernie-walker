const fs = require("fs");
const { sortContent } = require("./src/sort_content");

const main = function() {
  const fileName = process.argv[2];
  const content = [fs.readFileSync(fileName, "utf8").replace(/\n$/, "")];
  const sortedContent = sortContent(content);

  console.log(sortedContent.join("\n"));
};

main();
