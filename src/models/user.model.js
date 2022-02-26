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
            minlength: 8
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

/**
 * Check if email is taken
 * @param {string} email - The users's email
 * @param {ObjectId} [excludedEmail] - The email of an user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludedEmail) {
    const user = await this.findOne({ email, _id: { $ne: excludedEmail } });
    return !!user;
};

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

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

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
