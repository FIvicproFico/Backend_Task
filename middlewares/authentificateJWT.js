const jwt = require('jsonwebtoken')
const {accessTokenSecret, refreshTokenSecret, refreshTokens} = require('../constant/tokens')

const authenticateJWT = (req, res, next) => {

    console.log("MIDDLEWARE: \t AUTHENTIFICATION")
    console.log("Req. headers: \t " + JSON.stringify(req.headers.authorization.slice(0,17) + "..." + req.headers.authorization.slice(-10)))
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            //req.user = user;
            res.locals.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
};

module.exports = authenticateJWT