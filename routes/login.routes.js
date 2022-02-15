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
    const { username, email, password, } = req.body

    userService.getUserByEmail(email)
    .then(user => { 
        if (bcrypt.compareSync(password, user.password)){
            console.log("\t ACCESS GRANTED!")
            // Generate an access token
            //const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret, { expiresIn: '20m' })
            const accessToken = jwt.sign({ username: user.username, surname: user.surname, email: user.email, role: user.role }, accessTokenSecret)
            console.log("Response: \t " + accessToken.slice(0,10) + "..." + accessToken.slice(-10))
            res.json({accessToken})
        } else {
            console.log("\t ACCESS DENIED!!!")
            res.send('Response: \t' + 'Email or Password incorrect\n');
        }
    })
    .catch(err => res.json(err.message))
})

module.exports = router