const express = require('express')
const bodyParser = require('body-parser')
const users = require('../data/Users')
const authenticateJWT = require('../middlewares/authentificateJWT')

const router = express.Router()

router.use(bodyParser.json())

router.use((_, __, next) => {
    console.log('Users!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {

    console.log("GET: \t\t /users")
    console.log("Response: \t " + "Display all users\n")

    res.json({users});
});

router.post('/', authenticateJWT, (req, res) => {

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

module.exports = router