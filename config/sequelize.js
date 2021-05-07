const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:'runtime/store.sqlite',
    logging: false
});

module.exports = sequelize
