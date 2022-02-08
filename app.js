const express = require('express')

const loginRouter = require('./routes/login.routes')
const usersRouter = require('./routes/users.routes')

const app = express()

app.use('/login', loginRouter)
app.use('/users', usersRouter)

app.get('/', (_, res) => {
    console.log("GET: \t\t /")
    res.send('Hello World!')
})

module.exports = app;