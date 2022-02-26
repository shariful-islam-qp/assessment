const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'Designation title is required']
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Designation'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Position', positionSchema);
