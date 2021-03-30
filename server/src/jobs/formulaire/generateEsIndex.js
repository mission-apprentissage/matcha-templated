const { Formulaire } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const logger = require("../../common/logger");
const { runScript } = require("../scriptWrapper");

async function clearIndex() {
  try {
    let client = getElasticInstance();
    await client.indices.delete({ index: "formulaires" });
    logger.info("Index Formulaire CLEARED !");
  } catch (error) {
    logger.error(`Could not reset the index`, error);
  }
}

async function createIndex() {
  let requireAsciiFolding = true;
  await Formulaire.createMapping(requireAsciiFolding);
  logger.info("Index Formulaire CREATED !");
}

runScript(async () => {
  await clearIndex();
  await createIndex();
});
