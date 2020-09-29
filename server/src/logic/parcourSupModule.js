const csvToJson = require("convert-csv-to-json");
const logger = require("../common/logger");
const path = require("path");

const psupFilePath = path.join(__dirname, "../../data/psupData.csv");

class ParcoursupModule {
  constructor() {
    logger.info("PsupDataModule - Init Data");
    this.data = this.getPsupData(psupFilePath);
  }

  getPsupData(filePath) {
    try {
      if (this.data) {
        return this.data;
      } else {
        return csvToJson.getJsonFromCsv(filePath);
      }
    } catch (err) {
      logger.error(`getPsupData Error ${err}`);
      return null;
    }
  }
}

const parcoursupModule = new ParcoursupModule();
module.exports = parcoursupModule;
