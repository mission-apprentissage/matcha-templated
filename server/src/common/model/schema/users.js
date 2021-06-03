const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    username: {
      type: String,
      default: null,
      description: "L'identifiant de l'utilisateur",
      unique: true,
    },
    organization: {
      type: String,
      default: null,
      description: "Organisme de l'utilisateur",
    },
    email: {
      type: String,
      default: null,
      description: "L'email de l'utilisateur",
      unique: true,
    },
    password: {
      type: String,
      default: null,
      description: "Le mot de passe hashé",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      description: "true si l'utilisateur est administrateur",
    },
    scope: {
      type: [String],
      default: [],
      description: "Scope accessible par l'utilisateur",
    },
    last_connection: {
      type: Date,
      default: null,
      description: "Date de dernière connexion",
    },
  },
  {
    timestamps: true,
  }
);
