"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddbDoc = exports.ddb = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const REGION = "us-east-2";
const ddb = new client_dynamodb_1.DynamoDBClient({ region: REGION });
exports.ddb = ddb;
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false,
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false,
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDoc = lib_dynamodb_1.DynamoDBDocumentClient.from(ddb, translateConfig);
exports.ddbDoc = ddbDoc;
