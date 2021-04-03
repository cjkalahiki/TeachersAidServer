const {DataTypes} = require('sequelize');
const db = require('../db');

const Transactions = db.define('transaction', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Transactions;