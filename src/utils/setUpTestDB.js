const mongoose = require('mongoose');
const config = require('./../config/config');

const setupTestDB = () => {
    beforeAll(async () => {
        console.log('config', config.TEST_DB_URL);
        await mongoose.connect(config.TEST_DB_URL);
    });

    beforeEach(async () => {
        await Promise.all(
            Object.values(mongoose.connection.collections).map(
                async collection => collection.deleteMany()
            )
        );
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};

module.exports = setupTestDB;
