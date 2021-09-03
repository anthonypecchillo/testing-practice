const axios = require('axios');
const request = require('request');

const multiplyByTwo = function(num) {
  return num * 2;
};

const getDataFromWebhookEndpoint = async function() {
  const requestUrl = '/webhooks/DispactTrackB2C/Finished?skOrderNum=D2089886';

  // try {
  //   const response = await axios.get(requestUrl, queryParams);
  //   return response;
  // } catch (error) {
  //   console.error(error);
  //   return error;
  // }

  return new Promise((resolve, reject) => {
    request.get(requestUrl, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      // Trying to make the response look like the Response object
      // in the Koa docs here: https://koajs.com/#response
      resolve({
        status: res.status,
        message: res.message,
        body: JSON.parse(body),
      });
    });
  });
};

module.exports = {
  multiplyByTwo,
  getDataFromWebhookEndpoint
};
