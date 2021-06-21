const { program: cli } = require("commander");
const { runScript } = require("./jobs/scriptWrapper");
const resetPassword = require("./jobs/seed/resetPassword");

cli
  .command("reset-pwd <email>")
  .description("Réinitialisation du mot de passe de l'utilisateur <email>")
  .action((email) => {
    runScript(({ users }) => resetPassword(users, email));
  });

cli.parse(process.argv);
