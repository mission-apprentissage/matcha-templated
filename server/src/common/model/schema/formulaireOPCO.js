const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    raison_social: {
      type: String,
      default: null,
    },
    siret: {
      type: String,
      default: null,
    },
    adresse: {
      type: String,
      default: null,
    },
    geocoding: {},
    ville: {
      type: String,
      default: null,
    },
    nom: {
      type: String,
      default: null,
    },
    prenom: {
      type: String,
      default: null,
    },
    telephone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    offres: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
