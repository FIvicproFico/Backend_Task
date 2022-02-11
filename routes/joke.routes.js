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
    const surname = "Ivić"

    const parsedSurname = surname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/[š]/g, 's').replace(/[đ]/g, 'd').replace(/[ć]/g, 'c').replace(/[č]/g, 'c').replace(/[ž]/g, 'z')

    axios.get(`http://api.icndb.com/jokes/random?firstName=${name}&lastName=${parsedSurname}`)
    .then((response) => {
        // handle success
        console.log("API: \t Success");
        res.send(response.data.value.joke)
    })
    .catch((error) => {
        // handle error
        console.log(error)
        throw error
    })
})

module.exports = router

