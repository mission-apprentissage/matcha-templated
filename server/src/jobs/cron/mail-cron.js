const cron = require("node-cron");
const logger = require("../../common/logger");
const { getAllEvents } = require("../formulaire/getAllEvents");

cron.schedule("0 */3 * * *", async () => {
  logger.info("[CRONJOB] Start getAllEvents ");
  await getAllEvents();
  logger.info("[CRONJOB] End getAllEvents ");
});
