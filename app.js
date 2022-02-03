const express = require('express')
const usersRouter = require('./routes/users.routes')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const accessTokenSecret = 'test_access_token_secret'
const refreshTokenSecret = 'test_refresh_token_secret';
const refreshTokens = [];

//Database
const users = [
    {
        username: 'filip',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];

//Middleware function
const authenticateJWT = (req, res, next) => {

    console.log("MIDDLEWARE: \t AUTHENTIFICATION")
    console.log("Req. headers: \t " + JSON.stringify(req.headers.authorization.slice(0,17) + "..." + req.headers.authorization.slice(-10)))
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            //req.user = user;
            res.locals.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.use(bodyParser.json())
//app.use('/users', usersRouter)


app.get('/', (req, res) => {

    console.log("GET: \t\t /")

    res.send('Hello World!')
})


app.get('/login', function (req, res) {

    console.log("GET: \t\t /login\n")

    res.send('Login!')
})


app.post('/login', (req, res) => {

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