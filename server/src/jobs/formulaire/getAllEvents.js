const { asyncForEach } = require("../../common/utils/asyncUtils");
const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");

async function getAllEvents(mail) {
  // select all formulaire with at least one entry in the mailing array
  const data = await Formulaire.find({ $nor: [{ mailing: { $exists: false } }, { mailing: { $size: 0 } }] });

  await asyncForEach(data, async (item) => {
    let { messageId } = item.offres[0];

    if (!messageId) return;

    const { events } = mail.getEventsFromId({ messageId });

    item.events = events;
    item.save();
  });
}

module.exports = { getAllEvents };

runScript(async ({ mail }) => {
  await getAllEvents(mail);
});
