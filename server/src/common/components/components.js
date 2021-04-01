const createMail = require("./mail");
const createUsers = require("./users");
const createStats = require("./statistique");
const { connectToMongo } = require("../mongodb");
const createFormulaire = require("./formulaire");

module.exports = async (options = {}) => {
  const mail = options.mail || (await createMail());
  const users = options.users || (await createUsers());
  const stats = options.stats || (await createStats());
  const formulaire = options.formulaire || (await createFormulaire());

  return {
    mail,
    stats,
    users,
    formulaire,
    db: options.db || (await connectToMongo()).db,
  };
};
