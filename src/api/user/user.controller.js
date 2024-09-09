const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');

const userService = require('./user.service');
const catchAsync = require('../../utils/asyncWithCatch');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const user = await userService.getAll();
  res.send(user);
});

const getUser = catchAsync(async (req, res) => {
  const id = req.params.userId;
  const user = await userService.getOne(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.send(user);
});

const borrowBook = catchAsync(async (req, res) => {
  await userService.borrowBook(req.params);
  res.status(httpStatus.NO_CONTENT).send();
});

const returnBook = catchAsync(async (req, res) => {
  await userService.returnBook(req.params, req.body.score);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUser,
  getUsers,
  borrowBook,
  returnBook,
};
