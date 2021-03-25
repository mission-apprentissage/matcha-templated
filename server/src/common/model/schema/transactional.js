const { Schema } = require("mongoose");

const transactionalSchema = new Schema(
  {
    campagne: {
      type: String,
      default: null,
      description: "Identifiant de campagne",
    },
    messageId: {
      type: String,
      default: null,
      description: "Identifiant sendinblue",
    },
    code: {
      type: String,
      default: null,
      description: "Code erreur sendinblue",
    },
    message: {
      type: String,
      default: null,
      description: "Message erreur sendinblue",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { transactionalSchema };
