const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookid: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  fine: Number
}, { timestamps: true });

module.exports = mongoose.model('Return', returnSchema);

