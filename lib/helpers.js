/*
 * Helpers for various tasks
 *
 */

// Dependencies
var config = require("./config");

// Container for all the helpers
var helpers = {};

// filter the data
/**
 *
 * @param {Array} data db
 * @param {String} date millis
 */
helpers.filterByDate = function (data, date) {
  date = Number(date);
  const month = new Date(date).getMonth() + 1; // month is zero-indexed

  const year = new Date(date).getFullYear();

  return data.filter((item) => {
    // match month and year from the request to the data stored in db
    const dbMonth = new Date(item.Month).getMonth() + 1;

    const dbYear = new Date(item.Month).getFullYear();

    if (dbMonth === month && dbYear === year) {
      return true;
    }
    return false;
  });
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Export the module
module.exports = helpers;
