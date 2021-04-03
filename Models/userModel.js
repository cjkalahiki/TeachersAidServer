const {DataTypes, STRING} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("teacher", "donor"),
        defaultValue: "donor", //this is default signup (else they checked "teacher")
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;