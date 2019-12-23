const fs = require("fs");

const filename = process.argv[2];

const content = fs.readFileSync(filename, "utf8").replace(/\n$/, "");

console.log(
  content
    .split("\n")
    .sort()
    .join("\n")
);
