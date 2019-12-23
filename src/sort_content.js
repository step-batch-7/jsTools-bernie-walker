const sortContent = function(contents) {
  return contents.map(content =>
    content
      .split("\n")
      .sort()
      .join("\n")
  );
};

module.exports = { sortContent };
