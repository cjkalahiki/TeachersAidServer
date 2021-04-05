const {DataTypes} = require('sequelize');
const db = require('../db');

const Transactions = db.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Transactions;