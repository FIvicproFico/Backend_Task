const express = require('express')
const axios = require('axios').default;

const router = express.Router()

router.use('/', (req, res, next) => {
    console.log('Jokes Route!')
    next()
})

router.get('/', (req, res) => {
    console.log("GET: \t /jokes\n")

    const name = "Filip"
    const surname = "Ivic"

    axios.get(`http://api.icndb.com/jokes/random?firstName=${name}&lastName=${surname}`)
    .then((response) => {
        // handle success
        console.log("API: \t Success");
        res.json(response.data.value.joke)
    })
    .catch((error) => {
        // handle error
        console.log(error);
        throw error
    })
})

module.exports = router

