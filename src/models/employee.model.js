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

/**
 * Check if email is taken
 * @param {string} email - The employee's email
 * @param {ObjectId} [excludedEmail] - The email of an employee to be excluded
 * @returns {Promise<boolean>}
 */
employeeSchema.statics.isEmailTaken = async function (email, excludedEmail) {
    const employee = await this.findOne({ email, _id: { $ne: excludedEmail } });
    return !!employee;
};

module.exports = mongoose.model('Employee', employeeSchema);
