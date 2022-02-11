const express = require('express')
const bodyParser = require('body-parser')

const loginRouter = require('./routes/login.routes')
const usersRouter = require('./routes/users.routes')
const jokesRouter = require('./routes/joke.routes')

const app = express()
app.use(bodyParser.json())

//middleware
app.use('/login', loginRouter)
app.use('/users', usersRouter)
app.use('/jokes', jokesRouter)

app.get('/', (_, res) => res.send('Hello World!'))

module.exports = app;