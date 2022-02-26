const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
        },
        password: {
            type: String,
            required: [true, 'A user must have a password'],
            minlength: 8,
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, 'A user must have a confirmPassword'],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not same'
            }
        },
        passwordChangedAt: Date
    },
    { timestamps: true }
);

// Pre save middleware to encrypt password
userSchema.pre('save', async function (next) {
    // if password not modified do nothing and return
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(
        this.password,
        Number(config.BCRYPT_SALT)
    ); // more higher will be more cpu intensive
    this.confirmPassword = undefined; // to remove confirmPassword field
    next();
});

// Instance to compare password. This function return Boolean. If both are same return true otherwise false
userSchema.methods.comparePassword = async (password, userPassword) =>
    await bcrypt.compare(password, userPassword);

/* Instance method to check if password has been changed after token issued. return Boolean. return true if password has been
changed after token issued. otherwise return false*/
userSchema.methods.changedPasswordAfterToken = function (jwtTimestamp) {
    const jwtDate = new Date(jwtTimestamp);
    if (this.passwordChangedAt) {
        const changedTimestamp = new Date(this.passwordChangedAt);
        return jwtDate < changedTimestamp;
    }
    return false;
};

// post save middleware to set passwordChangedAt
userSchema.post('save', async function (docs, next) {
    // if password not modified do nothing and return
    if (!this.isModified('password')) return next();

    this.passwordChangedAt = new Date();
    next();
});

module.exports = mongoose.model('User', userSchema);
