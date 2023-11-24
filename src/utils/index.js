const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");

const sendVerificationEmail = require("./sendVerificationEmail");
const paginate = require("./paginate");
const passwordValidator = require("./passwordValidator");

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  paginate,
  passwordValidator,
};
