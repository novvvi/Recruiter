const mongoose = require('mongoose');
require('../models/models.js');
var request = require('request');



var User = mongoose.model('User');
var Exp = mongoose.model('Experience')
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
    createexp: (req, res) => {
        console.log("POST DATA : ", req.body);
        Exp.create(req.body, (err, data) => {
            if (err) {
                res.json({ message: "Error", error: err });
            } else {
                User.findByIdAndUpdate({_id: req.params.id}, {$push: {experience: data}}, function(err){
                    if(err){
                        res.json({ message: "Error", error: err });
                        console.log("something went wrong", err);
                    } else {
                        console.log("successfully added")
                        console.log("******************************")
                        res.json({ message: "Success", data: data });
                    }
                })  
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
    },
    show: (req, res) => {
        User.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                res.json({message: "Error", error: err});
            } else {
                console.log(data);
                res.json({message: "Success", data: data});
            }
        })
    },
    destroy: (req, res) => {
        User.remove({_id: req.params.id}, (err, data) => {
            if(err) {
                res.json({message: "Error", error: err});
            } else {
                console.log("DELETED!", data);
                res.json({message: "Success", data: data});
            }
        })
    }
}