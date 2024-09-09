const express = require('express');

// Routes
const userRoute = require('./api/user/user.routes');
const bookRoute = require('./api/book/book.routes');

const router = express.Router();

const routes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/books',
    route: bookRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
