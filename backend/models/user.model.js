const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Provide a First Name'],
        maxlength: 30
    },
    lastName: {
        type: String,
        required: [true, 'Provide a Last Name'],
        maxlenth: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email Address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
},
    { timestamps: true }
)

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createToken = function () {
    return jwt.sign(
        {
            userId: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, role: this.role
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' },
    );
};

userSchema.methods.comparePassword = async function (incomingPassword) {
    const isMatch = await bcrypt.compare(incomingPassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);