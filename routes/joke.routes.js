const express = require('express')
const axios = require('axios').default;
const authenticateJWT = require('../middlewares/authenticationJWT')
const emailService = require('../services/emailService')

const router = express.Router()

router.use('/', (req, res, next) => {
    console.log('Jokes Route!')
    next()
})

router.get('/', authenticateJWT, (req, res) => {
    console.log("GET: \t /jokes\n")

    const name = res.locals.user.username
    const surname = res.locals.user.surname

    const parsedName = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/[š]/g, 's').replace(/[đ]/g, 'd').replace(/[ć]/g, 'c').replace(/[č]/g, 'c').replace(/[ž]/g, 'z').replace(/[^a-zA-Z ]/g, "")
    const parsedSurname = surname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/[š]/g, 's').replace(/[đ]/g, 'd').replace(/[ć]/g, 'c').replace(/[č]/g, 'c').replace(/[ž]/g, 'z').replace(/[^a-zA-Z ]/g, "")

    axios.get(`http://api.icndb.com/jokes/random?firstName=${parsedName}&lastName=${parsedSurname}`)
    .then((response) => {
        // handle success
        console.log("API: \t Success")

        const mailOptions = {
            from: 'drol.pilif@gmail.com',
            to: res.locals.user.email,
            subject: 'Backend_Task',
            text: response.data.value.joke
        }
    
        emailService.sendMail(mailOptions)

        res.send(response.data.value.joke)
    })
    .catch((error) => {
        // handle error
        console.log(error)
        throw error
    })
})

module.exports = router

