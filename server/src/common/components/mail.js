const config = require("config");
const request = require("requestretry");
const mailRules = require("./mail.rules");
const { Transactional } = require("../model");

module.exports = async () => {
  return {
    sendmail: async (body) => {
      if (!body.sender) {
        throw new Error("Sendmail ERROR : sender is missing");
      }

      if (!body.to) {
        throw new Error("Sendmail ERROR : recipient is missing");
      }

      if (!body.templateId) {
        throw new Error("Sendmail ERROR : templateId is missing");
      }

      const options = {
        method: "POST",
        url: "https://api.sendinblue.com/v3/smtp/email",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": config.sendinblue.apikey,
        },
        body: body,
        json: true,
        maxAttempts: 8,
        retryDelay: 5000,
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
      };

      try {
        const result = await request(options);
        return result;
      } catch (error) {
        throw new Error("Sendmail ERROR :", error);
      }
    },
    createNewFormulairePayload: (id_form, email, raison_sociale) => {
      if (!id_form) {
        throw new Error("createNewFormulairePayload ERROR : id_form is missing");
      }
      if (!email) {
        throw new Error("createNewFormulairePayload ERROR : email is missing");
      }
      if (!raison_sociale) {
        throw new Error("createNewFormulairePayload ERROR : raison_sociale is missing");
      }

      return {
        sender: {
          name: "Mission interministérielle pour l'apprentissage",
          email: "charlotte.lecuit@beta.gouv.fr",
        },
        to: [
          {
            name: `${raison_sociale}`,
            email: `${email}`,
          },
        ],
        replyTo: {
          name: "Charlotte Lecuit",
          email: "charlotte.lecuit@beta.gouv.fr",
        },
        subject: `Accédez à vos offres déposées sur Matcha`,
        templateId: 178,
        tags: ["matcha-nouveau-formulaire"],
        params: {
          URL: `${config.publicUrl}/formulaire/${id_form}`,
        },
      };
    },
    createContact: async (body) => {
      if (!body.listIds) {
        throw new Error("CreateContact ERROR : listIds is missing");
      }

      if (typeof body.listIds !== Array) {
        throw new Error("CreateContact ERROR : listIds must be an array of number");
      }

      if (!body.email) {
        throw new Error("CreateContact ERROR : email is missing ");
      }

      const options = {
        method: "POST",
        url: "https://api.sendinblue.com/v3/contacts",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": config.sendinblue.apikey,
        },
        body: body,
        json: true,
        maxAttempts: 8,
        retryDelay: 5000,
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
      };

      try {
        const result = await request(options);
        return result;
      } catch (error) {
        throw new Error("CreateContact ERROR :", error);
      }
    },
    updateContact: async (body) => {
      if (!body.listIds) {
        throw new Error("CreateContact ERROR : listIds is missing");
      }

      if (typeof body.listIds !== Array) {
        throw new Error("CreateContact ERROR : listIds must be an array of number");
      }

      if (!body.email) {
        throw new Error("CreateContact ERROR : email is missing ");
      }

      const options = {
        method: "PUT",
        url: `https://api.sendinblue.com/v3/contacts/${body.email.replace("@", "%40")}`,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": config.sendinblue.apikey,
        },
        body: body,
        json: true,
        maxAttempts: 8,
        retryDelay: 5000,
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
      };

      try {
        const result = await request(options);
        return result;
      } catch (error) {
        throw new Error("UpdateContact ERROR :", error);
      }
    },
    requestMailTransaction: async (options) => {
      try {
        await Transactional.create(options);
        return true;
      } catch (error) {
        throw new Error("RequestMail ERROR", error);
      }
    },
    getAllEventsByEmail: async (email) => {
      const body = {
        method: "GET",
        url: `https://api.sendinblue.com/v3/smtp/statistics/events?limit=100&email=${email}&sort=desc`,
        headers: { Accept: "application/json", "api-key": config.sendinblue.apikey },
      };

      try {
        const result = await request(body);
        const { events } = await JSON.parse(result.body);
        return events;
      } catch (error) {
        throw new Error("getAllEventsByEmail ERROR", error);
      }
    },
    getRulesFromEvent: (event) => mailRules.find((rule) => rule.event === event),
  };
};
