'use strict';

const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const { sendResponse, sendError } = require('incrementer-lambda-utils');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getUser = (id) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: id
    }
  };
  return dynamodb.get(params).promise()
    .then(data => data.Item)
    .catch((err) => {
      throw new Error(err);
    });
};

const createResponse = (existingUser, payload) => {
  if (existingUser) {
    return { data: existingUser };
  }

  const newUser = Object.assign(payload, {
    apiKey: uuidv1(),
    current: 0
  });

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: newUser
  };

  dynamodb.put(params).promise()
    .then(() => newUser)
    .catch((err) => {
      throw new Error(err)
    });

  return { data: newUser };
}

const processLogin = async (event, context, callback) => {
  const payload = JSON.parse(event.body);

  try {
    const existingUser = await getUser(payload.id)
    const response = await createResponse(existingUser, payload)
    return sendResponse(response, callback);
  } catch (error) {
    return sendError({ error }, callback);
  }
};

module.exports = processLogin;
