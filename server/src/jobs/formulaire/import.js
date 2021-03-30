const path = require("path");
const { runScript } = require("../scriptWrapper");
const { getJsonFromXlsxFile } = require("../../common/utils/fileUtils");
const logger = require("../../common/logger");

const importer = async (formulaire) => {
  const file = path.resolve(__dirname, "./assets/lbb_20210323.xlsx");
  const data = getJsonFromXlsxFile(file);

  let stat = {
    file: data.length,
    imported: 0,
  };

  await Promise.all(
    data.map(async (e) => {
      let { siret, raisonsociale, email, tel } = e;
      tel = `0${tel}`;

      const payload = {
        siret,
        email,
        telephone: tel,
        raison_social: raisonsociale,
      };

      await formulaire.createForm(payload);
      stat.imported += 1;
    })
  );

  console.log("result :", stat);
};

runScript(async ({ formulaire }) => {
  logger.info("START import LBB");

  await importer(formulaire);

  logger.info("END import LBB");
});
