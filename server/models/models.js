var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, "Please enter your full name."]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true, // require unique
        required: [true, "Please enter your email."],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim: true
    },
    phoneNumber: {
        type: Number,
        trim: true,
        unique: true,
        required: [true, "Please enter your phone number '(000)-000-0000'."],
    },
    address: {
        type: String,
        require: [true, "Please enter your full address."]
    },
    ExpType: {
        type: String,
        default: "",
        trim: true
    },
    ExpName: {
        type: String,
        default: "",
        // required: 'Please enter a name',
        trim: true
    },
    ExpTitle: {
        type: String,
		default: '',
		trim: true,
		// required: 'Please enter a title'
    },
    ExpSpecialty: {
        type: String,
        // required: 'Please enter tasks',
        trim: true
    },
    ExpDetails: {
        type: String,
        default: '',
        trim: true,
        // required: 'Please enter details'
    },
    ExpStartDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000),
        // default: () => Date.now() + 7*24*60*60*1000 // need to ceeck which one works
    },
    ExpEndDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000),
        // default: () => Date.now() + 7*24*60*60*1000 // need to ceeck which one works
    }
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

module.exports = mongoose.model('User', UserSchema);
