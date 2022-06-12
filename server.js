if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')

const app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', error => console.error('Connected to Mongoose'))

app.listen(process.env.PORT || 3000, () => 'server started on dev')



