const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const users = require('./data/Users')
const {accessTokenSecret, refreshTokenSecret, refreshTokens} = require('./constant/tokens')

const usersRouter = require('./routes/users.routes')
const loginRouter = require('./routes/login.routes')

const authenticateJWT = require('./middlewares/authentificateJWT')

const app = express()
const port = 3000

app.use(bodyParser.json())
//app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.get('/', (req, res) => {

    console.log("GET: \t\t /")

    res.send('Hello World!')
})

// Transfered Login route from here to routes folder
// With POST to path '/login' we get accessToken

app.get('/users', authenticateJWT, (req, res) => {

    console.log("GET: \t\t /users")
    console.log("Response: \t " + "Display all users\n")

    res.json({users});
});


app.post('/users', authenticateJWT, (req, res) => {

    console.log("POST: \t\t /users")
    console.log("Request body: \t " + JSON.stringify(req.body))
    console.log("From middleware: " + JSON.stringify(res.locals.user.role));

    let user = ""
    const role  = res.locals.user.role;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    console.log("\t \t AUTHORIZED ")
    console.log("Response: \t " + "Added new user from request body\n")

    user = req.body
    users.push(user)

    res.json({user});
});

app.listen(port, () => {
    console.log(`Authentication service started on port ${port}`)
    console.log("\n")
})