const express = require('express')
const usersRouter = require('./routes/users.routes')

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})