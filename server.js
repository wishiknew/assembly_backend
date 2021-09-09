/*
 * Primary file for API
 *
 */

// Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const fs = require("fs");
const config = require("./lib/config");
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");

// Instantiate the HTTP server
const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(process.env.PORT || config.httpPort, function () {
  console.log("The HTTP server is running on port " + config.httpPort);
});

// // Instantiate the HTTPS server
// const httpsServerOptions = {
//   key: fs.readFileSync("./https/key.pem"),
//   cert: fs.readFileSync("./https/cert.pem"),
// };
// const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
//   unifiedServer(req, res);
// });

// // Start the HTTPS server
// httpsServer.listen(process.env.PORT || config.httpsPort, function () {
//   console.log("The HTTPS server is running on port " + config.httpsPort);
// });

// All the server logic for both the http and https server
const unifiedServer = function (req, res) {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  // Get the payload,if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    let chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object

      payload =
        typeof payload == "object" || typeof payload == "string" ? payload : {};
      console.log(trimmedPath, statusCode);
      // send either html or json back
      if (typeof payload == "string") {
        res.setHeader("Content-type", "text/html");
        res.writeHead(statusCode);
        res.write(payload);
        return res.end();
      } else if (typeof payload === "object") {
        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);
        // Return the response
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        return res.end(payloadString);
      }
    });
  });
};

// Define the request router
var router = {
  ping: handlers.ping,
  "api/visitors": handlers.visitors,
  "": handlers.ui,
  museum: handlers.museum,
};
