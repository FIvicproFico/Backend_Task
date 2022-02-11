const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json())

router.use('/', (req, res, next) => {
    console.log('Jokes Route!')
    res.send("Joke")
    next()
})

module.exports = router