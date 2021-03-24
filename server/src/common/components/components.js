const { connectToMongo } = require("../mongodb");
const createUsers = require("./users");
const createMail = require("./mail");
const createFormulaire = require("./formulaire");

module.exports = async (options = {}) => {
  const users = options.users || (await createUsers());
  const mail = options.mail || (await createMail());
  const formulaire = options.formulaire || (await createFormulaire());

  return {
    formulaire,
    mail,
    users,
    db: options.db || (await connectToMongo()).db,
  };
};
