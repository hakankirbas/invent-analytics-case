const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('./user.validation');
const userController = require('./user.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser);

router
  .route('/:userId/borrow/:bookId')
  .post(validate(userValidation.borrowBook), userController.borrowBook);

router
  .route('/:userId/return/:bookId')
  .post(validate(userValidation.returnBook), userController.returnBook);

module.exports = router;
