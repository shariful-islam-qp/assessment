const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['access', 'refresh'],
            required: true
        },
        expires: {
            type: Date,
            required: true
        },
        blacklisted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
