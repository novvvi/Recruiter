var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// var AddressSchema = {
//     street1: {
//         type: String,
//         trim: true
//     },
//     street2: {
//         type: String,
//         trim: true
//     },
//     city: {
//         type: String,
//         trim: true
//     },
//     state: {
//         type: String,
//         trim: true
//     },
//     country: {
//         type: String,
//         trim: true
//     },
//     zip: {
//         type: String,
//         validate: [/^$|^[0-9]{5}$/, 'ValidationError'],
//         trim: true
//     }
// }
var ExperienceSchema = {
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
}

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
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please enter your phone number '(000)-000-0000'."],
    },
    keyword: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        require: [true, "Please enter your full address."]
    },
    
    experience: [ExperienceSchema]
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

module.exports = mongoose.model('Recruiter', UserSchema);
