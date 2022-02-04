const express = require('express')

const usersRouter = require('./routes/users.routes')
const loginRouter = require('./routes/login.routes')

const app = express()
const port = 3000

app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.get('/', (_, res) => {
    console.log("GET: \t\t /")
    res.send('Hello World!')
})

// Transfered Login route from app to routes folder
// With POST to path '/login' we get accessToken

// Transfered Users route from app to routes folder
// With GET to path '/users' we get all users (if authentificated)
// With POST to path '/users' we add new user (if authorized)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
    console.log("\n")
})