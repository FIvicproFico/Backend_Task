require('dotenv').config();

tokens = {
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
    refreshTokens : [],
}

module.exports = tokens