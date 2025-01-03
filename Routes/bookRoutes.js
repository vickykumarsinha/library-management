const express = require('express');
const { getBooks, createBook, borrowBook, returnBook, updateBook } = require('../Controllers/bookController');
const router = express.Router();

router.get('/', getBooks);
router.post('/', createBook);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.put('/:id', updateBook);

module.exports = router;
