const { program: cli } = require("commander");
const { cancelFormulaire } = require("./jobs/formulaire/cancelFormulaire");
const { getAllEvents } = require("./jobs/formulaire/getAllEvents");
const { RelanceFormulaire } = require("./jobs/formulaire/relanceFormulaire");
const { generateIndexes } = require("./jobs/indexes/generateIndexes");
const { runScript } = require("./jobs/scriptWrapper");
const resetPassword = require("./jobs/seed/resetPassword");

cli
  .command("index formulaire")
  .description("Synchronise les index des collections mongo & reconstruit l'index elasticsearch")
  .action(() => {
    runScript(() => generateIndexes());
  });

cli
  .command("reset-pwd <email>")
  .description("Réinitialisation du mot de passe de l'utilisateur <email>")
  .action((email) => {
    runScript(() => resetPassword(email));
  });

cli
  .command("relance formulaire")
  .description("Envoie une relance par mail pour les offres expirant dans 7 jours")
  .action(() => {
    runScript(({ mail }) => RelanceFormulaire(mail));
  });

cli
  .command("annulation formulaire")
  .description("Annule les offres pour lesquels la date d'expiration est correspondante à la date actuelle")
  .action(() => {
    runScript(() => cancelFormulaire());
  });

cli
  .command("recuperer evenements")
  .description("Récupérer l'ensemble des emails envoyés pour un formulaire donné")
  .action(() => {
    runScript(({ mail }) => getAllEvents(mail));
  });

cli.parse(process.argv);
