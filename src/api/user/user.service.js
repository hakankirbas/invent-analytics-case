const { PrismaClient } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');

const prisma = new PrismaClient();

const create = async (data) => {
  await prisma.user.create({
    data,
  });
};

const getAll = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getOne = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      borrows: {
        include: { Book: true },
      },
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const transformedUser = {
    id: user.id,
    name: user.name,
    books: {
      past: user.borrows
        .filter((borrow) => borrow.returned)
        .map((borrow) => ({
          name: borrow.Book.name,
          userScore: borrow.score,
        })),
      present: user.borrows
        .filter((borrow) => !borrow.returned)
        .map((borrow) => ({
          name: borrow.Book.name,
        })),
    },
  };

  return transformedUser;
};

const borrowBook = async ({ userId, bookId }) => {
  const [user, book, borrow] = await prisma.$transaction([
    prisma.user.findUnique({
      where: { id: userId },
    }),
    prisma.book.findUnique({
      where: { id: bookId },
    }),
    prisma.borrows.findFirst({
      where: { bookId: bookId, returned: false },
    }),
  ]);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  if (borrow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book is currently borrowed by someone and not available');
  }

  await prisma.borrows
    .create({
      data: {
        userId,
        bookId,
        score: -1,
      },
    })
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
    });
};

const returnBook = async ({ userId, bookId }, score) => {
  const borrow = await prisma.borrows.findFirst({
    where: {
      userId,
      bookId,
      returned: false,
    },
  });
  if (!borrow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Borrow not found');
  }

  await prisma.borrows.update({
    data: { score, returned: true },
    where: {
      id: borrow.id,
    },
  });
};

module.exports = {
  create,
  getAll,
  getOne,
  borrowBook,
  returnBook,
};
