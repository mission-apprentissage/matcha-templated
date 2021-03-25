const { Formulaire } = require("../model");

module.exports = async () => {
  return {
    createForm: async (payload) => {
      try {
        const form = await Formulaire.create(payload);
        return form;
      } catch (e) {
        throw new Error("unable to create form", e);
      }
    },
    getForm: (id_form) => Formulaire.findOne({ id_form }),
    updateFormAndRequestMail: async () => {},
  };
};
