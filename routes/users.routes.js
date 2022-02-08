const express = require('express')
const bodyParser = require('body-parser')
let users = require('../data/Users')
const authenticateJWT = require('../middlewares/authenticationJWT')
const authorization = require('../middlewares/authorization')
const db = require('../models')

//db.sequelize.sync()

const router = express.Router()

router.use(bodyParser.json())

router.use((_, __, next) => {
    console.log('Users Route!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {

    console.log("GET: \t\t /users")
    console.log("Response: \t " + "Display all users\n")

    db.User.findAll({raw: true})
    .then(data => {
      console.log(data);
      res.json({data})
    })
    .catch(err => {
        console.log(err);
    })
})

// a middleware sub-stack that handles GET requests to the /users/:id path
router.get('/:id', authenticateJWT, (req, res, next)=>{

    console.log("GET: \t\t /users/:id")

    if (req.params.id === '0')
        next("route")
    else
        next()
}, (req, res) => {
    console.log("\t \t MEMEBER ")
    res.json(users.find((user) => user.id === parseInt(req.params.id)))
})

// handler for the /user/:id path, which returns only an admin
router.get('/:id', (req, res) => {
    console.log("\t \t ADMIN ")
    res.json(users[0])
})

router.post('/', authenticateJWT, authorization, (req, res) => {

    console.log("POST: \t\t /users")
    console.log("Request body: \t " + JSON.stringify(req.body))
    console.log("From middleware: " + JSON.stringify(res.locals.user.role))

    const user = req.body
    users.push(user)

    console.log("Response: \t " + "Added new user from request body\n")

    res.json({user})
});

router.put('/:id', authenticateJWT, authorization, (req, res) => {

    console.log("PUT: \t\t /users/:id")
    console.log("Request body: \t " + JSON.stringify(req.body))
    //console.log("From middleware: " + JSON.stringify(res.locals.user.role))

    const foundUser = users.find((user) => user.id === parseInt(req.params.id))

    if(foundUser){

        foundUser.username = req.body.username;

        //Needs to actually change username
        console.log("Response: \t " + "User Name Updated\n")

        res.write("User Name Updated")   
        res.write(" !")
        res.end();

    }else{
        return res.sendStatus(404)
    }
})

router.delete('/:id', authenticateJWT, authorization, (req, res) => {

    console.log("DELETE: \t\t /users/:id")
    console.log("Request body: \t " + JSON.stringify(req.body))

    const foundUser = users.find((user) => user.id === parseInt(req.params.id))

    if(foundUser){
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        console.log("Response: \t " + "User Deleted\n")
        res.send("User Deleted"); 
    }else{
        return res.sendStatus(404)
    }
})

module.exports = router