const logger = require("../../common/logger");
const { User } = require("../../common/model");
const passwordGenerator = require("generate-password");
const sha512Utils = require("../../common/utils/sha512Utils");

const passwordOptions = {
  length: 12,
  numbers: true,
};

module.exports = async (users, email) => {
  logger.info(`-- START - Reset password --`);
  let password = passwordGenerator.generate(passwordOptions);

  logger.info(`New password : ${password}`);

  await User.findOneAndUpdate({ email }, { password: sha512Utils.hash(password) });

  logger.info("-- END - Reset password --");
};
