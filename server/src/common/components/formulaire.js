const { Formulaire } = require("../model");

module.exports = async () => {
  return {
    createForm: async (payload) => {
      const user = await Formulaire.create(payload);
      return user;
    },
    getForm: (id_form) => Formulaire.findOne({ id_form }),
    updateFormAndRequestMail: async () => {},
  };
};
