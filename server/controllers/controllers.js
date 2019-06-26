const mongoose = require('mongoose');
require('../models/models.js');

var Recruiter = mongoose.model('Recruiter'); 

module.exports={
    index: function(req, res){
        Recruiter.find({}).sort({title: 1}).exec(function(err, user){
            if(err){
            console.log("Returned error", err);
                res.json({
                    message: "Error",
                    error: err
                })
            } else {
                res.json({
                    message: "Success",
                    data: user
                })
            }
        })
    },

    create: function (req,res){
        var user = new User();
        user.name = req.body.name;
        user.type = req.body.type;
        user.description = req.body.description;
        user.skill1 = req.body.skill1;
        user.skill2 = req.body.skill2;
        user.skill3 = req.body.skill3;
        user.save(function(err, result){
            if(err){
                console.log("something went wrong", err);
                res.json({
                    message: "Error",
                    error: err
                })
            } else {
                console.log("successfully updated")
                res.json({message: "Success", result: result});
            }
        })
    },

    update: function(req,res){
        Recruiter.findByIdAndUpdate(req.params.id, {$set: req.body},  { runValidators: true, context: 'query' }, function(err,user){
                if(err){
                    console.log("something went wrong in edit", err);
                    res.json({
                        message: "Error",
                        error: err
                    })
                } else {
                    console.log("Successfully edited author!");
                    res.json({message: "Success", user: user});
                }
            })
    }

}
