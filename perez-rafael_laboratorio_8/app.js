const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.json({ hello: "world" })
})

app.get('/pokemon/:name', function(req, res) {
    const { name } = req.params;
    res.send(`El pokemon es: ${name}`);
})


app.listen(3000)