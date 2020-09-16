const { runScript } = require("../scriptWrapper");
const download = require("./download");

runScript(async () => {
  await download();
});
