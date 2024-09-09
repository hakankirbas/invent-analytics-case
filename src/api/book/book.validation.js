const Joi = require('joi');

const createBook = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    bookId: Joi.number(),
  }),
};

module.exports = {
  createBook,
  getBook,
};
