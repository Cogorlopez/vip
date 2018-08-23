const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.drwnum = !isEmpty(data.drwnum) ? data.drwnum : "";
  data.revision = !isEmpty(data.revision) ? data.revision : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.drwnum)) {
    errors.drwnum = "Drawing number field is required";
  }

  if (Validator.isEmpty(data.revision)) {
    errors.revision = "Drawing number field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Drawing number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
