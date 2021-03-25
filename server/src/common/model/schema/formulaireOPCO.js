const { Schema } = require("mongoose");
const { nanoid } = require("nanoid");
const { transactionalSchema } = require("./transactional");

module.exports = new Schema(
  {
    id_form: {
      type: String,
      default: () => nanoid(),
      description: "Identifiant de formulaire unique",
    },
    raison_social: {
      type: String,
      default: null,
      description: "Raison social de",
    },
    siret: {
      type: String,
      default: null,
      description: "Numéro SIRET de l'entreprise",
    },
    adresse: {
      type: String,
      default: null,
      description: "Adresse de l'entreprise",
    },
    coordonnees_geo_latitude: {
      type: String,
      default: null,
      description: "Latitude de l'adresse de l'entreprise",
    },
    coordonnees_geo_longitude: {
      type: String,
      default: null,
      description: "Longitude de l'adresse de l'entreprise",
    },
    nom: {
      type: String,
      default: null,
      description: "Nom du contact",
    },
    prenom: {
      type: String,
      default: null,
      description: "Prénom du contact",
    },
    telephone: {
      type: String,
      default: null,
      description: "Téléphone du contact",
    },
    email: {
      type: String,
      default: null,
      description: "Email du contact",
    },
    offres: {
      type: Array,
      default: [],
      description: "Liste des métiers sur lesquels l'entreprise recherche des apprentis",
    },
    mailing: [
      {
        type: transactionalSchema,
        default: {},
        description: "Liste des évènements MAIL",
      },
    ],
  },
  {
    timestamps: true,
  }
);
