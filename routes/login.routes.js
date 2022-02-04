const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const users = require('../data/Users')
const {accessTokenSecret, refreshTokenSecret, refreshTokens} = require('../constant/tokens')

const router = express.Router()

router.use(bodyParser.json())

router.use((req, res, next) => {
    console.log('Login!')
    next()
})

router.get('/', (req, res) => {

    console.log("GET: \t\t /login\n")

    res.send('Login!')
})

router.post('/', (req, res) => {

    console.log("POST: \t\t /login")
    console.log("Request body: \t" + JSON.stringify(req.body))
    
    // Read username and password from request body
    const { username, password } = req.body

    // Filter user from the users array by username and password
    const user = users.find(user => { return user.username === username && user.password === password })

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '20m' })
        const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        })
        console.log("Response: \t " + accessToken.slice(0,10) + "..." + accessToken.slice(-10))
        console.log("\t\t " + refreshToken.slice(0,10) + "..." + refreshToken.slice(-10) + "\n")
        
    } else {
        res.send('Username or password incorrect');
    }
})

module.exports = router