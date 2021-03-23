const request = require("requestretry");
const config = require("config");
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
  };
};
