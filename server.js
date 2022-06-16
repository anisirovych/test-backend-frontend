if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Dependencies
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// Routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const app = express()


// View
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// 
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'))

// 
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// Mongo connection
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', error => console.error('Connected to Mongoose'))

app.listen(process.env.PORT || 3000, () => 'server started on dev')



