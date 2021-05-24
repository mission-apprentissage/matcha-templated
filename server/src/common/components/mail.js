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
    getEmailBody: ({ email, raison_sociale, templateId, params, tags, id_form, subject }) => {
      if (!id_form) {
        throw new Error("getEmailBody ERROR : id_form is missing");
      }
      if (!email) {
        throw new Error("getEmailBody ERROR : email is missing");
      }
      if (!raison_sociale) {
        throw new Error("getEmailBody ERROR : raison_sociale is missing");
      }
      if (!templateId) {
        throw new Error("getEmailBody ERROR : templateId is missing");
      }
      if (isNaN(templateId) || typeof templateId !== "number") {
        throw new Error("getEmailBody ERROR : templateId must be a Number");
      }
      if (!tags) {
        throw new Error("getEmailBody ERROR : tags is missing");
      }
      if (!Array.isArray(tags)) {
        throw new Error("getEmailBody ERROR : tags must be an array of string(s)");
      }
      if (!subject) {
        throw new Error("getEmailBody ERROR : subject is missing");
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
        subject,
        templateId,
        tags,
        params: {
          URL: `${config.publicUrl}/formulaire/${id_form}`,
          ...params,
        },
      };
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
