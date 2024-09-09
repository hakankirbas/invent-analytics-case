const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes');
const ApiError = require('./utils/ApiError');

const app = express();
const port = 3000;

// parse json body
app.use(express.json());

// register routes
app.use(routes);

// handle unregistered endpoints
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle errors and prevent express.js's default html responses
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message || undefined);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on ${port}`);
});
