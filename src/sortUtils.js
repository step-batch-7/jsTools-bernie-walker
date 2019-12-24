const generateError = function(errorCode) {
  const errorCollection = {
    ENOENT: "sort: No such file or directory",
    ERR_INVALID_ARG_TYPE: "Error: invalid argument"
  };
  return errorCollection[errorCode];
};

module.exports = { generateError };
