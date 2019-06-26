var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var addressSchema = {
    street1: {
        type: String,
        trim: true
    },
    street2: {
        type: String,
        trim: true
    },
    city: {
        String,
        trim: true
    },
    state: {
        String,
        trim: true
    },
    country: {
        String,
        trim: true
    },
    zip: {
        String,
        validate: [/^$|^[0-9]{5}$/, 'ValidationError'],
        trim: true
    }
}
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please enter your first name."]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Please enter your last name."]
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
    address: [addressSchema],
    
    // this will link the experienceModel.js
    _experience: {type: Schema.Types.ObjectID, ref: 'Experience'}
}, {
    timestamps: true
})

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

module.exports = mongoose.model('User', UserSchema);