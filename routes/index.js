const express = require('express')
const router = express.Router()
const Books = require('../models/book')

router.get('/', async (req, res) => {
	let books
	try {
		books = await Books.find().sort({ createAt: 'desc' }).limit(10).exec()
		res.render('index', { books: books })
	} catch (e) {
		books = []
	}

})



module.exports = router