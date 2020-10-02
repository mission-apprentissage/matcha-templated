const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    questionnaire_id: { type: String, unique: true, required: true },
    candidat: {
      prenom: {
        type: String,
        default: null,
        description: "Prénom du candidat",
      },
      nom: {
        type: String,
        default: null,
        description: "Nom du candidat",
      },
      email: {
        type: String,
        default: null,
        description: "Email du candidat",
      },
      dateNaissance: {
        type: Date,
        default: null,
        description: "Date de naissance du candidat",
      },
      telephone: {
        type: String,
        default: null,
        description: "Téléphone du candidat",
      },
    },
    voeux: {
      type: [
        {
          code_voeux: {
            type: String,
            default: null,
            description: "Code fichier voeux Parcoursup",
          },
          etablissement: {
            type: String,
            default: null,
            description: "Etablissement dans lequel le candidat souhaite effectuer sa formation",
          },
          niveau: {
            type: String,
            default: null,
          },
          formation: {
            type: String,
            default: null,
            description: "Nom de la formation voeux Parcoursup",
          },
          metier: {
            type: Object,
            default: null,
            description: "Métier recherché associé à la formation choisit",
          },
          choix: {
            type: Boolean,
            default: false,
            description:
              "Choix de promouvoir la candidature sur le voeux en question. Ne s'applique pas si code_voeux est vide (saisie manuelle)",
          },
        },
      ],
      default: [],
      description: "Liste des voeux",
    },
    mobilite: {
      commune: {
        type: String,
        description: "Commune de résidence du candidat",
      },
      permis: {
        type: Boolean,
        description: "Permis de conduire",
      },
      distance: {
        type: Object,
        dateNaissance: "Distance maximal de déplacement du candidat",
      },
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
          nomEntreprise: {
            type: String,
            default: null,
            description: "Nom de l'entreprise",
          },
          adresseEntreprise: {
            type: String,
            default: null,
            description: "Adresse de l'entreprise",
          },
          dateDebut: {
            type: Date,
            default: Date.now,
            description: "Date de début",
          },
          dateFin: {
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
  },
  { timestamps: true }
);
