const express = require('express')
const bodyParser = require('body-parser')
let users = require('../data/Users')
const db = require('../models')
const { v4: uuidv4 } = require('uuid');
const authenticateJWT = require('../middlewares/authenticationJWT')
const authorization = require('../middlewares/authorization')
const service = require('../services/userServis')

const router = express.Router()

router.use(bodyParser.json())

router.use((_, __, next) => {
    console.log('Users Route!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {

    service.getUsers()
    .then(data => {
        console.log(data)
        res.send({data})
    })

    //res.json({users})
})

// a middleware sub-stack that handles GET requests to the /users/:id path
router.get('/:id', authenticateJWT, (req, res, next)=>{

    console.log("GET: \t\t /users/:id")

    if (req.params.id === '1')
        next("route")
    else
        next()
}, (req, res) => {

    console.log("\t \t MEMEBER ")

    db.User.findByPk(parseInt(req.params.id))
    .then(data => {
        res.json({data})
     })
    .catch(err => {
          console.log(err)
     })

    // const user = users.find((user) => user.id === parseInt(req.params.id))
    // res.json({user})
})

// handler for the /user/:id path, which returns only an admin
router.get('/:id', (req, res) => {

    console.log("\t \t ADMIN ")

    //res.json(db.User.findByPk(1))   // !!! db.User.findByPk(1) is async function, we need to wait for data reaveal first to display data to user !!!
    db.User.findByPk(1)
    .then(data => {
        res.json({data})
    })
    .catch(err => {
        console.log(err);
    })

     // res.json({user[0]})
})

router.post('/', authenticateJWT, authorization, (req, res) => {

    console.log("POST: \t\t /users")
    console.log("Request body: \t " + JSON.stringify(req.body))
    console.log("From middleware: " + JSON.stringify(res.locals.user.role))

    db.User.findOrCreate({
        where: { username: req.body.username, password: req.body.password },
        defaults: {
            uuid: uuidv4(),
            role: req.body.role
        }
    }).catch(err => {
        console.log(err);
    })

    //users.push(user)
    console.log("Response: \t " + "Added new user from request body\n")
    res.send("Response: \t " + "Added new user from request body\n")

});

router.put('/:id', authenticateJWT, authorization, (req, res) => {

    console.log("PUT: \t\t /users/:id")
    console.log("Request body: \t " + JSON.stringify(req.body))
    //console.log("From middleware: " + JSON.stringify(res.locals.user.role))

    //const foundUser = users.find((user) => user.id === parseInt(req.params.id))

    db.User.findByPk(parseInt(req.params.id))
    .then(data => {
        db.User.update({
            username: req.body.username
        },{
            where: {
                id: data.id
            }
        })
        .then(data => {
            res.send("Username updated")
        })
        .catch(err => {
                console.log(err);
        })
     })
    .catch(err => {
          console.log(err)
     })

    // if(foundUser){

    //     foundUser.username = req.body.username;

    //     //Needs to actually change username
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
    console.log("Request body: \t " + JSON.stringify(req.body))

    //const foundUser = users.find((user) => user.id === parseInt(req.params.id))

    db.User.findByPk(parseInt(req.params.id))
    .then(data => {
        db.User.destroy({
            where:{
                id: data.id
            }
        })
        .then(data => {
            res.json("User deleted")
        })
        .catch(err => {
                console.log(err);
        })
     })
    .catch(err => {
          console.log(err)
     })

    // if(foundUser){
    //     users = users.filter((user) => user.id !== parseInt(req.params.id))
    //     console.log("Response: \t " + "User Deleted\n")
    //     res.send("User Deleted"); 
    // }else{
    //     return res.sendStatus(404)
    // }
})

module.exports = router