const { Schema } = require("mongoose");

const transactionalSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["TRANSAC", "CAMPAGNE"],
      default: "TRANSAC",
      decription: "Type de mail",
    },
    origin: {
      type: String,
      default: null,
      description: "Nom de la collection d'origin de l'object",
    },
    id: {
      type: String,
      default: null,
      description: "id de l'object",
    },
    message_id: {
      type: String,
      default: null,
      description: "ID mail renvoyé par sendinblue",
    },
    error: {
      type: Object,
      default: null,
      description: "Code et message renvoyé par sendinblue",
    },
    status: {
      type: String,
      enum: ["SENT", "PENDING"],
      default: null,
      description: "Statut de l'email",
    },
    sent_at: {
      type: Date,
      default: null,
      description: "Date d'envoie de l'email",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { transactionalSchema };
