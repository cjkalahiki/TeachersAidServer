const db = require('../db');
const UserModel = require('./userModel');
const TransactionsModel = require('./transactionsModel');
const CampaignsModel = require('./campaignModel');

//associations here
UserModel.hasMany(CampaignsModel);
UserModel.hasMany(TransactionsModel);

CampaignsModel.belongsTo(UserModel);
CampaignsModel.hasMany(TransactionsModel);

TransactionsModel.belongsTo(CampaignsModel); //belongs to UserModel

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        TransactionsModel,
        CampaignsModel
    } 
};