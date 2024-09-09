const express = require('express');
const validate = require('../../middlewares/validate');
const bookValidation = require('./book.validation');
const bookController = require('./book.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(bookValidation.createBook), bookController.createBook)
  .get(bookController.getBooks);

router
  .route('/:bookId')
  .get(validate(bookValidation.getBook), bookController.getBook);

module.exports = router;
