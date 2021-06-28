const cron = require("node-cron");
const logger = require("../../common/logger");
const { cancelFormulaire } = require("../formulaire/cancelFormulaire");
const { getAllEvents } = require("../formulaire/getAllEvents");
const { transactionalReports } = require("../formulaire/transactionalBot");

// Every 3 hours
cron.schedule("0 */3 * * *", async () => {
  logger.info("[CRONJOB] Start getAllEvents ");
  await getAllEvents();
  logger.info("[CRONJOB] End getAllEvents ");
});

// everyday at 8 AM
cron.schedule("0 8 * * *", async () => {
  logger.info("[CRONJOB] Start extend offer reminder ");
  await transactionalReports();
  logger.info("[CRONJOB] End extend offer reminder ");
});

// everyday at 7 AM
cron.schedule("0 7 * * *", async () => {
  logger.info("[CRONJOB] Start cancel offer ");
  await cancelFormulaire();
  logger.info("[CRONJOB] End cancel offer ");
});
