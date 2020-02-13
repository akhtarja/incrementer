'use strict';

const AWS = require('aws-sdk');
const { sendResponse, sendError } = require('incrementer-lambda-utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const resetInteger = (apiKey, newInteger) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    FilterExpression: "#a = :apiKey",
    ExpressionAttributeNames: { "#a": "apiKey" },
    ExpressionAttributeValues: { ":apiKey": apiKey }
  };

  return dynamodb.scan(params).promise()
    .then(data => {
      if (data.Items.length === 0) throw new Error("not found")

      const item = data.Items[0];
      item.current = newInteger;
      const params = {
        TableName: process.env.TABLE_NAME,
        Item: item
      };

      return dynamodb.put(params).promise()
        .then(() => newInteger)
        .catch((err) => {
          throw new Error(err)
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const reset = async (event, context, callback) => {
  const apiKey = event.headers.Authorization.split(' ')[1];
  const newInteger = parseInt(event.body.split('=')[1], 10);

  if (newInteger >= 0) {
    try {
      await resetInteger(apiKey, newInteger);
      return sendResponse({ data: { current: newInteger } }, callback)
    } catch (error) {
      return sendError({ error }, callback);
    }
  } else {
    return sendError({ error: { message: 'new value must 0 or higher' } }, callback);
  }
};

module.exports = reset;
