const mongoose = require('mongoose');


const borrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // bookId as ObjectId referencing Book
  duedate: { type: Date, default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', borrowSchema);
