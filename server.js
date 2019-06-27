const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var app = express()

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));


require('./server/config/mongoose');
require('./server/config/routes')(app);

// app.all("*", (req, res, next) => {
//     res.sendFile(path.resolve("./public/dist/public/index.html"))
// });

app.listen(4200, function() {
    console.log("8000 running");
})
