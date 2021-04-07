const {Sequelize} = require('sequelize');

const seqeulize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DATABASE_DIALECT,
    ssl: process.env.ENVIRONMENT === 'production'
})

module.exports = seqeulize;