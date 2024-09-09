const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (data) => {
  await prisma.book.create({
    data,
  });
};

const getAll = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const getOne = async (id) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
    include: { borrows: true },
  });

  const transformedBook = {
    id: book.id,
    name: book.name,
    score:
      book.borrows
        .filter((borrow) => borrow.returned)
        .reduce((a, b) => a + b.score, 0) / book.borrows.length || -1,
  };

  return transformedBook;
};

module.exports = {
  create,
  getAll,
  getOne,
};
