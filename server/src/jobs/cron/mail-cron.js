const cron = require("node-cron");
const { getAllEvents } = require("../formulaire/getAllEvents");

cron.schedule("20 * * * *", async () => {
  await getAllEvents();
});
