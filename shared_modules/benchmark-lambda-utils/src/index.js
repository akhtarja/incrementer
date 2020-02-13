'use strict';

const sendResponse = (item, callback) => {
  const response = {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(item)
  };

  callback(null, response);
};

const sendError = (err, callback) => {
  const errorReponse = {
    statusCode: err.statusCode || 400,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(err)
  };

  callback(null, errorReponse);
};

module.exports = {
  sendResponse,
  sendError
};
