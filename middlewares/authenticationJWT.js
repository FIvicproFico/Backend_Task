const jwt = require('jsonwebtoken')

const {accessTokenSecret, refreshTokenSecret, refreshTokens} = require('../constants/tokens')

const authenticateJWT = (req, res, next) => {

    console.log("MIDDLEWARE: \t AUTHENTICATION")
    console.log("Req. headers: \t " + JSON.stringify(req.headers.authorization.slice(0,17) + "..." + req.headers.authorization.slice(-10)))
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            res.locals.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
};

module.exports = authenticateJWT