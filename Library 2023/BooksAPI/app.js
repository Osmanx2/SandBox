// ./app.js
const express = require("express");
const mountRoutes = require("./routes");
const promMid = require("express-prometheus-middleware");
const app = express();

app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Homework implement authorization middleware 
// https://dev.to/cyberwolves/node-js-api-authentication-with-jwt-json-web-token-auth-middleware-ggm

app.use(
  promMid({
    autoregister: true,
    includeStatusCode: true,
    includePath: true,
    includeMethod: true,
  })
);

mountRoutes(app);

if (process.env.NODE_ENV === "development") {
  app.use(function onerror(err, req, res, next) {
    console.log(err);
  });
}

module.exports = app;
