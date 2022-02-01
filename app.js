const express = require('express')
const app = express()
const port = 3000

//To serve static files such as images, CSS files, and JavaScript files,
app.use(express.static('public'))

//To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served 
//app.use('/static', express.static('public'))

//app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
  res.send('Hello World !!!')
})

app.post('/', function (req, res) {
    res.send('Got a POST request !!!')
})

app.get('/user', function(req, res) {
    res.send('Hello User !!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})