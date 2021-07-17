const { createXLSXFile } = require("../../../common/utils/fileUtils");
const { Formulaire } = require("../../../common/model");
const { runScript } = require("../../scriptWrapper");
const logger = require("../../../common/logger");
const erratum = require("./erratum");
const path = require("path");

runScript(async () => {
  let contacts = await Formulaire.find({
    origine: "1J1S",
    email: { $nin: erratum },
  })
    .select("email id_form")
    .lean();

  logger.info(`Updating ${contacts.length} contacts`);

  contacts = contacts.map((x) => {
    x.MATCHA_URL = `https://matcha.apprentissage.beta.gouv.fr/formulaire/${x.id_form}`;
    x.id_form = undefined;
    return x;
  });

  const filePath = path.join(__dirname, `../assets/contacts_1J1S.xlsx`);

  createXLSXFile(contacts, filePath);

  return;
});
