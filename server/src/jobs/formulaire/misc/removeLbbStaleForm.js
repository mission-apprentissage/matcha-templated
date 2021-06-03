/**
 * Remove unused forms from the LBB campaign
 */

const { runScript } = require("../../scriptWrapper");
const { Formulaire } = require("../../../common/model");
const logger = require("../../../common/logger");

runScript(async () => {
  const count = await Formulaire.countDocuments({ offres: { $size: 0 } });
  await Formulaire.deleteMany({ offres: { $size: 0 } });
  logger.info(`${count} formulaires vides supprimés`);
});
