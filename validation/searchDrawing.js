const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.drwnum = !isEmpty(data.drwnum) ? data.drwnum : "";

  if (Validator.isEmpty(data.drwnum)) {
    errors.drwnum = "Drawing number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
