const express = require('express')
const authenticateJWT = require('../middlewares/authenticationJWT')
const authorization = require('../middlewares/authorization')
const bodyParser = require('body-parser')
const userService = require('../services/userService')

const router = express.Router()
router.use(bodyParser.json())

router.use((_, __, next) => {
    console.log('Users Route!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {
    console.log("GET: \t\t /users")

    userService.getUsers()
    .then(users => res.send({users}))
    .catch(err => console.log(err))
    //res.json({users})
})

// a middleware sub-stack that handles GET requests to the /users/:id path
router.get('/:id', authenticateJWT, (req, res, next) => {
    console.log("GET: \t\t /users/:id")
    if (req.params.id === '1')
        next("route")
    else
        next()
}, (req, res) => {

    userService.getUserById(parseInt(req.params.id))
    .then(user => res.send({user}))
    .catch(err => console.log(err))

    // const user = users.find((user) => user.id === parseInt(req.params.id))
    // res.json({user})
})

// handler for the /user/:id path, which returns only an admin
router.get('/:id', (req, res) => {
    console.log("\t \t ADMIN ")

    userService.getUserById(1)
    .then(user => res.send({user}))
    .catch(err => console.log(err))

    //res.json(db.User.findByPk(1))   // !!! db.User.findByPk(1) is async function, we need to wait for data reaveal first to display data to user !!!
    // res.json({user[0]})
})

router.post('/', authenticateJWT, authorization, (req, res) => {
    console.log("POST: \t\t /users")
    console.log("Request Body: \t " + JSON.stringify(req.body))
    console.log("From Middleware: " + JSON.stringify(res.locals.user.role))

    userService.addNewUser(req.body.username, req.body.password, req.body.role)
    .then(() => {
        console.log("Response: \t " + "Added new user from request body\n")
        res.send("User Added!")
    })
    .catch(err => res.json(err.message))

    //users.push(user)
});

router.put('/:id', authenticateJWT, authorization, (req, res) => {
    console.log("PUT: \t\t /users/:id")
    console.log("Request Body: \t " + JSON.stringify(req.body))
    console.log("From Middleware: " + JSON.stringify(res.locals.user.role))

    userService.updateUsername(parseInt(req.params.id), req.body.username)
    .then(() => {
        console.log("Response: \t " + "User Name Updated\n")
        res.send("Username Updated!")
    })
    .catch(err => console.log(err))

    //const foundUser = users.find((user) => user.id === parseInt(req.params.id))
    // if(foundUser){
    //     foundUser.username = req.body.username;
    //     // Needs to actually change username
    //     console.log("Response: \t " + "User Name Updated\n")
    //     res.write("User Name Updated")   
    //     res.write(" !")
    //     res.end();
    // }else{
    //     return res.sendStatus(404)
    // }
})

router.delete('/:id', authenticateJWT, authorization, (req, res) => {
    console.log("DELETE: \t\t /users/:id")
    console.log("Request Body: \t " + JSON.stringify(req.body))

    userService.deleteUser(parseInt(req.params.id))
    .then(() => {
        console.log("Response: \t " + "User Deleted\n")
        res.send("User Deleted!"); 
    })
    .catch(err => console.log(err))

    // const foundUser = users.find((user) => user.id === parseInt(req.params.id))
    // if(foundUser){
    //     users = users.filter((user) => user.id !== parseInt(req.params.id))
    //     console.log("Response: \t " + "User Deleted\n")
    //     res.send("User Deleted"); 
    // }else{
    //     return res.sendStatus(404)
    // }
})

module.exports = router