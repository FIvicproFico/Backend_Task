const express = require('express')

var bodyParser = require('body-parser')
const uuid = require("uuid");
let users = require("../data/Users");

const router = express.Router()

let jsonParser = bodyParser.json()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /users
router.use('/', (req, res, next) => {
    console.log('Users')
    next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /users/:id path
router.use('/:id', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
}, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
})

//GET
// a middleware sub-stack that handles GET requests to the /users
router.get('/', (req, res, next) => {
    //res.send("All Users!")
    res.json(users)
})

// a middleware sub-stack that handles GET requests to the /users/:id path
router.get('/:id', (req, res, next) => {
    if (req.params.id === '0') next('route')
    else next()
}, (req, res, next) => {
    //res.send("User " + req.params.id)
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
})

// handler for the /user/:id path, which renders a special page
router.get('/:id', (req, res, next) => {
    console.log("Special User")
    next()
},(req, res, next) => {
    res.json(users[0])
})

//POST
router.post("/", jsonParser, (req, res) => {

    //console.log('request', req.body);
    const newUser = {
      id: uuid.v4(),
      name: req.body.name,
      email: req.body.email
    };

    if (!newUser.name || !newUser.email) {
        return res.sendStatus(400);
    }

    users.push(newUser);
    res.send("User Added");   
});

//PUT
router.put("/:id", jsonParser, (req, res) => {

    //console.log('request', req.body);
    const foundUser = users.find((user) => user.id === parseInt(req.params.id));

    if(foundUser){
        foundUser.name = req.body.name;
        foundUser.email = req.body.email;
        res.write("User Updated");
            
        res.write(" !");
        res.end();

    }else{
        return res.sendStatus(404);
    }
});


//DELETE
router.delete("/:id", jsonParser, (req, res) => {

    //console.log('request', req.body);
    const foundUser = users.find((user) => user.id === parseInt(req.params.id));

    if(foundUser){
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        res.send("User Deleted");   
    }else{
        return res.sendStatus(404);
    }
});

module.exports = router