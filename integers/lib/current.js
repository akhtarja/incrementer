'use strict';

const AWS = require('aws-sdk');
const { sendResponse, sendError } = require('incrementer-lambda-utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getCurrentInteger = (apiKey) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    FilterExpression: "#a = :apiKey",
    ExpressionAttributeNames: { "#a": "apiKey" },
    ExpressionAttributeValues: { ":apiKey": apiKey }
  };

  return dynamodb.scan(params).promise()
    .then(data => {
      if (data.Items.length === 0) throw new Error("not found");
      return data.Items[0].current;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const current = async (event, context, callback) => {
  const apiKey = event.headers.Authorization.split(' ')[1];

  try {
    const currentInteger = await getCurrentInteger(apiKey);
    sendResponse({ data: { current: currentInteger } }, callback);
  } catch (error) {
    return sendError({ error }, callback);
  }
};

module.exports = current;
