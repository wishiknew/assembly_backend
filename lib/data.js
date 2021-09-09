/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require("fs");
var path = require("path");
const csv = require("csv-parser");
var helpers = require("./helpers");

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

lib.convertCSVtoObj = function (dir, file, callback) {
  let results = []; // arrayObj converted from csv
  try {
    fs.createReadStream(lib.baseDir + dir + "/" + file)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        callback(false, results);
      });
  } catch (err) {
    callback(err, []);
  }
};

// Read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + "/" + file, "utf8", function (err, data) {
    if (!err && data) {
      callback(false, data);
    } else {
      callback(err, data);
    }
  });
};
// Export the module
module.exports = lib;
