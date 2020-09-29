const logger = require("../../common/logger");

module.exports = async (users) => {
  await users.createUser("user", "name", "123456", "user@test.fr", "0611511900", "password");
  await users.createUser("admin", "name", "78910", "admin@test.fr", "0611511901", "password", {
    permissions: { isAdmin: true },
  });
  logger.info(`User 'testUser' with password 'password' is successfully created `);
  logger.info(`User 'testAdmin' with password 'password' and admin is successfully created `);
};
