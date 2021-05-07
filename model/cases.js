const {Model} = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')

class Cases extends Model { }

Cases.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        label: SQL.STRING,
        version: SQL.STRING,
        size: SQL.NUMBER,
        icon: SQL.STRING,
        updatedAt: SQL.DATE
    }, { sequelize, modelName: 'cases' }
);

module.exports = Cases
