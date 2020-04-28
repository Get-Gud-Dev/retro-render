const express = require('express')

var app = express()

app.use(express.static('pub'))

app.listen(8090, () => {
    console.log("Listening on 8090")
})