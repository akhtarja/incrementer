'use strict';

const AWS = require('aws-sdk');
const { sendResponse, sendError } = require('incrementer-lambda-utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getNextInteger = (apiKey) => {
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
      item.current++;
      const params = {
        TableName: process.env.TABLE_NAME,
        Item: item
      };

      return dynamodb.put(params).promise()
        .then(() => item.current)
        .catch((err) => {
          throw new Error(err)
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const next = async (event, context, callback) => {
  const apiKey = event.headers.Authorization.split(' ')[1];

  try {
    const nextInteger = await getNextInteger(apiKey);
    return sendResponse({ data: { next: nextInteger } }, callback);
  } catch (error) {
    return sendError({ error }, callback);
  }
};

module.exports = next;
