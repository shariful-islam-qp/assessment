const httpStatus = require('http-status');
const { Position } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

/**
 * Create a user
 * @param {Object} positionBody
 * @returns {Promise<Position>}
 */
const createPosition = async positionBody => {
    if (await Position.isTitleTaken(positionBody.title)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
    }
    return Position.create(positionBody);
};

/**
 * Create a user
 * @param {Object} {}
 * @returns {Promise<Position>}
 */
const getAllPosition = async () => {
    return Position.find({}).select('title parentId');
};

/**
 * Create a user
 * @param {Object} positionList
 * @returns {Promise<Position>}
 */
const generateHierarchy = async list => {
    // generate hierarchy
    return new Promise((resolve, reject) => {
        if (!list || !Array.isArray(list))
            reject({
                name: 'Argument type mismatch.',
                message: 'provided value should be an array.'
            });

        var map = {},
            node,
            roots = [],
            i;
        mappedArr = [];

        for (i = 0; i < list.length; i += 1) {
            map[list[i]._id] = i; // initialize the map

            mappedArr[i] = {
                id: list[i]._id,
                title: list[i].title,
                parentId: list[i]?.parentId,
                child: []
            }; // the extracted id as key, and the item as value
        }

        for (i = 0; i < mappedArr.length; i += 1) {
            node = mappedArr[i];
            if (!node.parentId) {
                roots.push(node);
            } else {
                // if you have dangling branches check that map[node.parentId] exists
                mappedArr[map[node.parentId]].child.push(node);
            }
        }

        if (roots.length > 0) resolve(roots);
        else
            reject({
                name: 'Not found error!',
                message: 'No position created yet.'
            });
    });
};

/**
 * Create a user
 * @param {Object} rootId
 * @returns {Promise<Position>}
 */
const getAllPositionByRoot = async rootId => {
    return Position.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(rootId) } },
        {
            $graphLookup: {
                from: 'positions',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'children'
            }
        },
        { $project: { _id: 0, result: '$children._id' } }
    ]);
};

module.exports = {
    createPosition,
    getAllPosition,
    generateHierarchy,
    getAllPositionByRoot
};
