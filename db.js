const {Sequelize} = require('sequelize');

const seqeulize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    dialect: process.env.DATABASE_DIALECT,
    ssl: process.env.ENVIRONMENT === 'production'
})

module.exports = seqeulize;