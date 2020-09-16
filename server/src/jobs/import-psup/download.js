const logger = require("../../common/logger");
const azureStorage = require("../../common/utils/azureStorage");
const config = require("config");
const path = require("path");

const psupFilePath = path.join(__dirname, "../../../data/psupData.csv");

module.exports = async () => {
  logger.info(`-- Downloading PSup 20K data from azure blob storage`);
  const storage = azureStorage(config.azureStorageConnectionString);
  await storage.saveBlobToFile("psup-container", "users_26082020.csv", psupFilePath);
  logger.info(` --- Psup 20K data file successfully downloaded !`);
};
