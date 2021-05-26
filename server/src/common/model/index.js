const mongoose = require("mongoose");
const schema = require("./schema");
const { mongoosastic, getElasticInstance } = require("../esClient");

const createModel = (modelName, descriptor, options = {}) => {
  const schema = new mongoose.Schema(descriptor);

  if (options.paginate) {
    schema.plugin(require("mongoose-paginate"));
  }

  if (options.esIndexName) {
    schema.plugin(mongoosastic, { esClient: getElasticInstance(), index: options.esIndexName });
  }
  if (options.createMongoDBIndexes) {
    options.createMongoDBIndexes(schema);
  }
  return mongoose.model(modelName, schema, options.collectionName);
};

module.exports = {
  Formulaire: createModel("formulaires", schema.formulaireOPCOSchema, {
    esIndexName: "formulaires",
    paginate: true,
  }),
  User: createModel("users", schema.usersSchema),
  Log: createModel("logs", schema.logSchema),
};
