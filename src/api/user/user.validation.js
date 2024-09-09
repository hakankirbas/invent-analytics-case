const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const borrowBook = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
    bookId: Joi.number().required(),
  }),
};

const returnBook = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
    bookId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    score: Joi.number().required(),
  }),
};

module.exports = {
  createUser,
  getUser,
  borrowBook,
  returnBook,
};
