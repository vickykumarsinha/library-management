const Book = require('../Models/Book');
const Borrow = require('../Models/Borrow');
const Return = require('../Models/Return');

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.borrowBook = async (req, res) => {
  const borrow = new Borrow(req.body);
  await borrow.save();
  res.status(201).json(borrow);
};

exports.returnBook = async (req, res) => {
  const { username, bookid, fine } = req.body;
  const record = new Return({ username, bookid, fine });
  await record.save();
  res.status(201).json(record);
};

exports.updateBook = async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
};
