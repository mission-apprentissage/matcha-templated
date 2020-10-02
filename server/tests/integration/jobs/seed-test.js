const assert = require("assert");
const integrationTests = require("../../utils/integrationTests");
const { Questionnaire, User } = require("../../../src/common/model");
const seed = require("../../../src/jobs/seed/seed");

// integrationTests(__filename, ({ getContext }) => {
//   it("Vérifie la création d'un questionnaire depuis le job", async () => {
//     const { db, components } = await getContext();
//     await Questionnaire.deleteMany({});
//     await User.deleteMany({});
//     await seed(db, components.users);

//     const userFound = await User.findOne({ username: "test@test.fr" });
//     assert.strictEqual(userFound.username, "test@test.fr");

//     const questionnaireFound = await Questionnaire.findOne({ user_id: userFound._id });
//     assert.notDeepStrictEqual(questionnaireFound, null);
//   });
// });
