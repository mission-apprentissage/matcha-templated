const { Formulaire } = require("../model");
const { OPENED, CLICKED, DELIVERED, HARD, SOFT } = require("./mail.constant");

module.exports = {
  getAllStatistiques: async () => {
    const nbForms = async () => await Formulaire.countDocuments();
    const nbOpened = async () => await Formulaire.countDocuments({ events: { event: OPENED } });
    const nbClicked = async () => await Formulaire.countDocuments({ events: { event: CLICKED } });
    const nbDelivered = async () => await Formulaire.countDocuments({ events: { event: DELIVERED } });
    const nbHard = async () => await Formulaire.countDocuments({ events: { event: HARD } });
    const nbSoft = async () => await Formulaire.countDocuments({ events: { event: SOFT } });

    return {
      nbHard,
      nbSoft,
      nbForms,
      nbOpened,
      nbClicked,
      nbDelivered,
    };
  },
};
