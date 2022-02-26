const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Position title is required']
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Designation'
        }
    },
    { timestamps: true }
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeTitle] - The title of the position to be excluded
 * @returns {Promise<boolean>}
 */
positionSchema.statics.isTitleTaken = async function (title, excludeTitle) {
    const position = await this.findOne({ title, _id: { $ne: excludeTitle } });
    return !!position;
};

module.exports = mongoose.model('Position', positionSchema);
