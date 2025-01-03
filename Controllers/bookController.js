const Book = require('../Models/Book');
const Borrow = require('../Models/Borrow');
const Return = require('../Models/Return');
const User = require('../Models/User');

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

  try {
    const { username, bookId } = req.body;

    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(400).json({ message: 'User not found, please check username' });
    }

    const book = await Book.findById(bookId); // Correctly query Book by _id
    if (!book) {
      return res.status(400).json({ message: 'Invalid book ID, please check book details' });
    }

    const borrow = new Borrow({ username, bookId, userId: user._id });  // Store bookId as ObjectId
    await borrow.save();
    res.status(201).json(borrow);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  // const { username, bookid, fine } = req.body;
  // const record = new Return({ username, bookid, fine });
  // await record.save();
  // res.status(201).json(record);


  const { username, bookid, fine } = req.body;

  try {
    console.log('Received username:', username);
    // Find the user by username to get their _id
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the user has borrowed the book
    const borrowRecord = await Borrow.findOne({ userId: user._id, bookid });

    if (!borrowRecord) {
      return res.status(404).json({ error: 'This user has not borrowed the specified book.' });
    }

    // Proceed to create the return record
    const returnRecord = new Return({ userId: user._id, bookid, fine });
    await returnRecord.save();

    res.status(201).json(returnRecord);
  } catch (err) {
    console.error('Error returning the book:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateBook = async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
};
