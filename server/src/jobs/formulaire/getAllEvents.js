const logger = require("../../common/logger");
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");

async function getAllEvents(mail) {
  // select all formulaire with at least one entry in the mailing array
  const data = await Formulaire.find({ $nor: [{ mailing: { $exists: false } }, { mailing: { $size: 0 } }] });

  logger.info(`Fetching events for ${data.length} forms`);

  await Promise.all(
    data.map(async (item) => {
      let { messageId } = item.mailing[0];

      if (!messageId) return;

      const { body } = await mail.getEventsFromId({ messageId });

      let { events } = JSON.parse(body);

      item.events = events;
      await item.save();
    })
  );

  logger.info(`Done!`);
}

module.exports = { getAllEvents };

runScript(async ({ mail }) => {
  await getAllEvents(mail);
});
