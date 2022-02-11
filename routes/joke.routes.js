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
    //const surname = "Ivić"
    const surname = "Ivić"

    const a = surname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    const b = a.replace(/[š]/g, 's')
    const c = b.replace(/[đ]/g, 'd')
    const d = c.replace(/[č]/g, 'ć')
    const e = d.replace(/[ć]/g, 'c')
    const parsedSurname = e.replace(/[ž]/g, 'z')

    axios.get(`http://api.icndb.com/jokes/random?firstName=${name}&lastName=${parsedSurname}`)
    .then((response) => {
        // handle success
        console.log("API: \t Success");
        res.json(response.data.value.joke)
    })
    .catch((error) => {
        // handle error
        console.log(error)
        throw error
    })
})

module.exports = router

