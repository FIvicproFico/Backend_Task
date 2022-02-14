const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {accessTokenSecret} = require('../constants/tokens')
const userService = require('../services/userService')

// const util = require('util');
// util.promisify

const router = express.Router()

router.use((req, res, next) => {
    console.log('Login Route!')
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
    const { username, password, email } = req.body

    userService.getUserByEmail(email)
    .then(users => {
        const user = users.find(user => user.username === username && bcrypt.compareSync(password, user.password))
        if (user){
            // Generate an access token
            //const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '20m' })
            const accessToken = jwt.sign({ username: user.username, email: user.email, role: user.role }, accessTokenSecret)
            console.log("Response: \t " + accessToken.slice(0,10) + "..." + accessToken.slice(-10))
            res.json({accessToken})
        } else {
            res.send('Response: \t' + 'Email incorrect\n');
        }
    })
    .catch(err => res.json(err.message))
})

module.exports = router