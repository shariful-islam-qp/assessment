const mongoosastic = require('mongoosastic');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Position title is required'],
            es_indexed: true
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Designation'
        }
    },
    { timestamps: true }
);

positionSchema.plugin(mongoosastic);

/**
 * Check if email is taken
 * @param {string} title - The position title
 * @param {ObjectId} [excludeTitle] - The title of the position to be excluded
 * @returns {Promise<boolean>}
 */
positionSchema.statics.isTitleTaken = async function (title, excludeTitle) {
    const position = await this.findOne({ title, _id: { $ne: excludeTitle } });
    return !!position;
};

const Position = mongoose.model('Position', positionSchema);

Position.createMapping((err, mapping) => {
    console.log('mapping created');
});

module.exports = Position;
