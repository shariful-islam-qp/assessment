const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const config = require('./../config/config');

const setupTestDB = () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(config.TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db(config.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });
};

module.exports = setupTestDB;
