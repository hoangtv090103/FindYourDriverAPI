const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const validPass = await bcrypt.compare(password, hashedPassword);
  return validPass;
};

module.exports = { hashPassword, comparePassword };
