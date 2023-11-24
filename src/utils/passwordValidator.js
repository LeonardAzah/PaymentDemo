const validator = require("validator");

const passwordValidator = async (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validator.matches(password, passwordRegex);
};

module.exports = passwordValidator;
