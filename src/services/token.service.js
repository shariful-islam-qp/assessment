const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        userId: userId,
        expires: expires.toDate(),
        type,
        blacklisted
    });
    return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async user => {
    const accessTokenExpires = moment().add(
        config.JWT_ACCESS_EXPIRATION_MINUTES,
        'minutes'
    );
    const accessToken = generateToken(user.id, accessTokenExpires, 'access');

    const refreshTokenExpires = moment().add(
        config.JWT_REFRESH_EXPIRATION_DAYS,
        'days'
    );
    const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh');
    await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};

module.exports = {
    generateAuthTokens
};
