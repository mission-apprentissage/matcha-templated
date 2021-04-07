const { Formulaire } = require("../../common/model");
const { runScript } = require("../scriptWrapper");

if (process.env.standalone) {
  runScript(async () => {
    console.log("Start updating...");
    const data = await Formulaire.find({}).lean();

    await Promise.all(
      data.map(async (item) => {
        let form = new Formulaire(item);
        try {
          await Formulaire.findByIdAndDelete(item._id);
          await form.save();
        } catch (error) {
          console.log(error);
        }
      })
    );
    console.log("Done !");
  });
}
