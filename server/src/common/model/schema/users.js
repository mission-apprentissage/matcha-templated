const { Schema } = require("mongoose");

module.exports = new Schema({
  username: {
    type: String,
    default: null,
    description: "L'identifiant username de l'utilisateur",
    unique: true,
  },
  nom: {
    type: String,
    default: null,
    description: "Le nom de l'utilisateur",
  },
  prenom: {
    type: String,
    default: null,
    description: "Le prénom de l'utilisateur",
  },
  parcoursup_id: {
    type: String,
    default: null,
    description: "L'identifiant parcoursup de l'utilisateur",
    unique: true,
  },
  email: {
    type: String,
    default: null,
    description: "L'email de l'utilisateur",
    unique: true,
  },
  telephone: {
    type: String,
    default: null,
    description: "Le numéro de telephone de l'utilisateur",
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
