var express = require('express')
var bodyParser = require('body-parser')
var app = express()

const port = 8081

const checkModel = (model) => {
    let isOk = true

    if (!model.fullname) {
        console.log('Full name undefined')
        isOk = false
    } else if (model.fullname.toLowerCase() === 'john doe') {
        console.log('Full name "John DOE" unauthorized')
        isOk = false
    }

    if (!model.age || isNaN(parseInt(model.age))) {
        console.log('Age invalid or undefined')
        isOk = false
    }

    return isOk
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.post('/', function (req, res) {
    const model = req.body
    let response = ''

    console.log('Received POST request')
    console.log('Received full name: ' + model.fullname)
    console.log('Received age: ' + model.age)

    try
    {
        if (checkModel(model)) {
            res.writeHead(200, { "Content-Type": "text/json" })
            response = 'Hello ' + model.fullname + ' you are ' + model.age + ' already ?'
        } else {
            res.writeHead(400, { "Content-Type": "text/json" })
        }
    } catch (ex) {
        res.writeHead(400, { "Content-Type": "text/json" })
    }

    res.end(response)
})

var server = app.listen(port, function () {
    var port = server.address().port

    console.log("Server listening on port " + port + "...")
})