const { Sequelize, Model, DataTypes } = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')

class categories extends Model {}
categories.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        name: SQL.STRING,
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE
}, {sequelize, modelName: 'category'})

module.exports = categories
