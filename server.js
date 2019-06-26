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

<<<<<<< HEAD
app.listen(4200, function() {
    console.log("8000 running");
=======
app.listen(8000, function() {
    console.log("Listening on port 8000");
>>>>>>> 44630228ac4ac5dc122c4edfe70230fcd1a3c885
})
