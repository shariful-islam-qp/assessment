const mongoosastic = require('mongoosastic');
const client = mongoosastic.client({
    node: 'localhost:9200'
});

module.exports = client;
