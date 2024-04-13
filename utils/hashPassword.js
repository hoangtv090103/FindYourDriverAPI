const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordString =
    typeof password === "string" ? password : await password;
  const hashedPassword = await bcrypt.hash(passwordString, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const validPass = await bcrypt.compare(password, hashedPassword);
  return validPass;
};

module.exports = { hashPassword, comparePassword };
