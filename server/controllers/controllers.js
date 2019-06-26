const mongoose = require('mongoose');
require('../models/models.js');

var User = mongoose.model('User');
module.exports = {
    index: (req, res) => {
        User.find({}, (err, data) => {
            if (err) {
                res.json({ message: "Error", error: err });
            } else {
                console.log(data)
                res.json({ message: "Success", data: data });
            }
        }).sort({ title: 1 }) // open to modifications 
    },
    create: (req, res) => {
        console.log("POST DATA : ", req.body);
        User.create(req.body, (err, data) => {
            if (err) {
                res.json({ message: "Error", error: err });
            } else {
                res.json({ message: "Success", data: data });
            }
        })
    },
    update: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            $set: req.body}, {
            runValidators: true,
            context: 'query'
        }, function (err, user) {
            if (err) {
                console.log("something went wrong in edit", err);
                res.json({  message: "Error", error: err
                })
            } else {
                console.log("Successfully edited author!");
                res.json({  message: "Success", user: user });
            }
        })
    }
}