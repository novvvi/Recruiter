var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ExperienceSchema = new mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String,
        default: "",
        required: 'Please enter a name',
        trim: true
    },
    title: {
        type: String,
		default: '',
		trim: true,
		required: 'Please enter a title'
    },
    specialty: {
        type: String,
        required: 'Please enter tasks',
        trim: true
    },
    details: {
        type: String,
        default: '',
        trim: true,
        required: 'Please enter details'
    },
    startDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000),
        default: () => Date.now() + 7*24*60*60*1000 // need to ceeck which one works
    },
    endDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000),
        default: () => Date.now() + 7*24*60*60*1000 // need to ceeck which one works
    }
}, {timestamps: true})

module.exports = mongoose.model('Experience', ExperienceSchema)