const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const employeeSchema = Schema(
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
        positionId: {
            type: Schema.Types.ObjectId,
            ref: 'Position',
            required: [true, 'PositionId is required']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
