const mongoose = require('mongoose');
const returnSchema = new mongoose.Schema({
  username: String,
  bookid: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  fine: Number
}, { timestamps: true });

module.exports = mongoose.model('Return', returnSchema);
