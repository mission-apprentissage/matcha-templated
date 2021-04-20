const logger = require("../../common/logger");
const { Formulaire } = require("../../common/model");
const { asyncForEach } = require("../../common/utils/asyncUtils");
const { runScript } = require("../scriptWrapper");

async function getAllEvents(mail) {
  // select all formulaire with at least one entry in the mailing array
  const data = await Formulaire.find({ $nor: [{ mailing: { $exists: false } }, { mailing: { $size: 0 } }] });

  logger.info(`Fetching events for ${data.length} forms`);

  await asyncForEach(data, async (item) => {
    if (!item.mailing || item.mailing.length === 0) return;
    await asyncForEach(item.mailing, async ({ messageId }) => {
      if (!messageId) return;
      const { body } = await mail.getEventsFromId({ messageId });

      let { events } = JSON.parse(body);

      logger.info(`${events.length} events recovered`);

      item.events = item.events.concat(events);
      await item.save();
    });
  });

  logger.info(`Done!`);
}

module.exports = { getAllEvents };

runScript(async ({ mail }) => {
  await getAllEvents(mail);
});
