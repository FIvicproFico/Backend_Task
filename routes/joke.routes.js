const express = require('express')
const authenticateJWT = require('../middlewares/authenticationJWT')
const randomJokeApiService = require('../services/randomJokeApiService')

const router = express.Router()

router.use('/', (req, res, next) => {
    console.log('Jokes Route!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {
    console.log("GET: \t /jokes\n")

    const {username, surname, email} = res.locals.user

    // const name = res.locals.user.username
    // const surname = res.locals.user.surname
    // const email = res.locals.user.email

    randomJokeApiService.sendNameSurnameRequest(username, surname, email)
    .then(response => res.send(response.data.value.joke))
    .catch(err => res.json(err.message))
})

router.get('/random', authenticateJWT, (req, res) => {
    console.log("GET: \t /jokes/random\n")

    randomJokeApiService.sendRequest()
    .then(response => res.send(response.data.value.joke))
    .catch(err => res.json(err.message))
})

module.exports = router

