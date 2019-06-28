const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var fs = require('fs')
var app = express()

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));


require('./server/config/mongoose');
require('./server/config/routes')(app);

// var _getAllFilesFromFolder = function(dir) {
//     var results = [];

//     fs.readdirSync(dir).forEach(function(file) {

//         file = dir+'/'+file;
//         console.log(file)
//         var stat = fs.statSync(file);

//         if (stat && stat.isDirectory()) {
//             results = results.concat(_getAllFilesFromFolder(file))
//         } else results.push(file);

//     });

//     return results;

// };

// console.log(_getAllFilesFromFolder(__dirname))

// app.all("*", (req, res, next) => {
//     res.sendFile(path.resolve("./public/dist/public/index.html"))
// });

app.listen(4200, function() {
    console.log("8000 running");
})
