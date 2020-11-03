const { runScript } = require("../scriptWrapper");
const upload = require("./upload");

runScript(async () => {
  await upload();
});
