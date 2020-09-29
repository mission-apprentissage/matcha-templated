const { runScript } = require("../scriptWrapper");
const clear = require("./clear");

runScript(async ({ db }) => {
  await clear(db);
});
