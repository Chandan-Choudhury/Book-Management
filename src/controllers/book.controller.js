const HttpError = require("../utils/http-error");
const Book = require("../models/book.model");

const handleError = (err, statusCode = 500, next) => {
    const error = new HttpError(`${err.message}`, statusCode);
    return next(error);
};

const getBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find();
        res.status(200).json({
            message: "Books fetched.",
            error: false,
            books: books.map((book) => ({
                id: book.id,
                title: book.title,
                author: book.author,
                summary: book.summary,
            })),
        });
    } catch (err) {
        handleError(err, 500, next);
    }
};

const getBookById = async (req, res, next) => {
    let book;
    try {
        book = await Book.findById(req.params.id, "-__v");
        if (!book) {
            throw new HttpError("Could not find a book for the provided id.");
        }
        res.status(200).json({
            message: "Book fetched.",
            error: false,
            book: book,
        });
    } catch (err) {
        handleError(err, 500, next);
    }
};

const createBook = async (req, res, next) => {
    const { title, author, summary } = req.body;

    let existingBook;
    try {
        existingBook = await Book.findOne({ title: title });
    } catch (err) {
        handleError(err, 500, next);
    }

    if (existingBook) {
        const error = new HttpError(
            "Book already exist, please try to create new one.",
            422
        );
        return next(error);
    }

    const newBook = new Book({
        title,
        author,
        summary,
    });
    try {
        await newBook.save();
        res.status(201).json({
            message: "Book created.",
            error: false,
            book: {
                id: newBook.id,
                title: newBook.title,
                author: newBook.author,
                summary: newBook.summary,
            },
        });
    } catch (err) {
        handleError(err, 500, next);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id, "-__v");
        if (!book) {
            throw new HttpError("Could not find a book for the provided id.");
        }
        await book.deleteOne();
        res.status(200).json({
            message: "Book Deleted.",
            error: false,
            book: book,
        });
    } catch (err) {
        handleError(err, 500, next);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id, "-__v");
        if (!book) {
            throw new HttpError("Could not find a book for the provided id.");
        }
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.summary = req.body.summary || book.summary;
        await book.save();
        res.status(200).json({
            message: "Book updated.",
            error: false,
            book: book,
        });
    } catch (err) {
        handleError(err, 500, next);
    }
};

exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.createBook = createBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
