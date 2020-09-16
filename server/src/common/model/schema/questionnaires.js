const { Schema } = require("mongoose");

module.exports = new Schema({
  user_id: {
    type: Object,
    default: null,
    description: "Identifiant de l'utilisateurs lié",
  },
  voeux: {
    type: [
      {
        code_voeux: {
          type: String,
          default: null,
          description: "Code fichier voeux Parcoursup",
        },
        formation: {
          type: String,
          default: null,
          description: "Nom de la formation voeux Parcoursup",
        },
        choix: {
          type: Boolean,
          default: false,
          description: "Choix",
        },
      },
    ],
    default: [],
    description: "Liste des voeux",
  },
  experiences: {
    type: [
      {
        nom: {
          type: String,
          default: null,
          description: "Nom de l'experience",
        },
        taches: {
          type: [String],
          default: [],
          description: "Liste des taches",
        },
        nom_entreprise: {
          type: String,
          default: null,
          description: "Nom de l'entreprise",
        },
        adresse_entreprise: {
          type: String,
          default: null,
          description: "Adresse de l'entreprise",
        },
        date_debut: {
          type: Date,
          default: Date.now,
          description: "Date de début",
        },
        date_fin: {
          type: Date,
          default: Date.now,
          description: "Date de fin",
        },
      },
    ],
    default: [],
    description: "Liste des experiences",
  },
  activites: {
    type: [
      {
        nom: {
          type: String,
          default: null,
          description: "Nom de l'activité",
        },
        periodicite: {
          type: String,
          default: null,
          description: "Periodicité",
        },
        criteres: {
          type: [String],
          default: [],
          description: "Critères",
        },
      },
    ],
    default: [],
    description: "Liste des activites",
  },
  recommandations: {
    type: [
      {
        nom: {
          type: String,
          default: null,
          description: "Nom de la recommandation",
        },
        prenom: {
          type: String,
          default: null,
          description: "Prénom de la recommandation",
        },
        email: {
          type: String,
          default: null,
          description: "Email",
        },
        telephone: {
          type: String,
          default: null,
          description: "Numéro de telephone",
        },
        role: {
          type: String,
          default: null,
          description: "Role",
        },
      },
    ],
    default: [],
    description: "Liste des recommandations",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Date d'ajout en base de données",
  },
  last_update_at: {
    type: Date,
    default: Date.now,
    description: "Date de dernières mise à jour",
  },
});
