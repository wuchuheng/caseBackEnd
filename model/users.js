const { Sequelize, Model, DataTypes } = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')

class users extends Model { }

users.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        username: SQL.STRING,
        password: SQL.STRING,
        role: SQL.STRING,
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE
    }, { sequelize, modelName: 'users' }
);

module.exports = users
