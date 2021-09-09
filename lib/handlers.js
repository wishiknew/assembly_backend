/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require("./data"); // lib to handle data operations
var helpers = require("./helpers"); // common helpers
const Response = require("./response");

// Define all the handlers
var handlers = {};

// this is the data object that is being received in the parameter

// const requestData = {
//   trimmedPath: trimmedPath,
//   queryStringObject: queryStringObject,
//   method: method,
//   headers: headers,
//   payload: helpers.parseJsonToObject(buffer),
// };

// visitors

/**
 *
 * @param {Number} requestData.queryStringObject.date
 * @param  {String} requestData.queryStringObject.ignore // optional
 */

handlers.visitors = function (requestData, callback) {
  // if the request is not get
  if (requestData.method !== "get") {
    return callback(405, { message: "Only GET request allowed" });
  }
  // .data/museum/data.csv is acting as the DB
  _data.convertCSVtoObj("museum", "data.csv", function (err, collection) {
    if (!err) {
      // write logic for the respective query
      const date = requestData.queryStringObject.date;
      const ignore = requestData.queryStringObject.ignore;
      // filter the array by date
      let [filteredObj] = helpers.filterByDate(collection, date);

      if (!filteredObj) return callback(404); // if not found

      let response = new Response(filteredObj);
      response.createResponse(ignore);
      callback(200, response);
    } else {
      callback(400);
    }
  });
};

// Ping
handlers.ping = function (data, callback) {
  callback(200);
};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};
// the ui to test
handlers.ui = function (data, callback) {
  _data.read("assets", "index.html", (err, data) => {
    if (!err) {
      callback(200, data);
    } else {
      console.log(err);
    }
  });
};
// sends all the data
handlers.museum = function (data, callback) {
  _data.convertCSVtoObj("museum", "data.csv", function (err, collection) {
    if (!err) {
      callback(200, collection);
    } else {
      callback(400);
    }
  });
};
// Export the handlers
module.exports = handlers;
