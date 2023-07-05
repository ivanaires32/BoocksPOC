import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import prisma from "../database";

export async function getBooks() {
  const books = await prisma.book.findMany()
  return books
}

export async function getBook(id: number) {
  const book = await prisma.book.findFirst({
    where: {
      id
    }
  })
  return book
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const newBook = await prisma.book.create({
    data: {
      author,
      title,
      publisher,
      purchaseDate
    }
  })

  return newBook
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const editBook = await prisma.book.update({
    data: {
      grade,
      review,
      read: true
    }, where: {
      id: bookId
    }
  })
  return editBook
}