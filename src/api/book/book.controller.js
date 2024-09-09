const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');

const bookService = require('./book.service');

const createBook = async (req, res) => {
  const book = await bookService.create(req.body);
  res.status(httpStatus.CREATED).send(book);
};

const getBooks = async (req, res) => {
  const book = await bookService.getAll();
  res.send(book);
};

const getBook = async (req, res) => {
  const id = req.params.bookId;
  const book = await bookService.getOne(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  res.send(book);
};

module.exports = {
  createBook,
  getBook,
  getBooks,
};
