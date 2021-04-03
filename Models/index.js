const db = require('../db');
const UserModel = require('./userModel');
const TransactionsModel = require('./transactionsModel');

//associations here


module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        TransactionsModel
    } 
};