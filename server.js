if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Dependencies
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Routers
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', error => console.error('Connected to Mongoose'))

app.listen(process.env.PORT || 3000, () => 'server started on dev')



