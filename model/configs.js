const {Model} = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')

class Configs extends Model { }

Configs.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        name: SQL.STRING,
        value: SQL.STRING,
    }, { sequelize, modelName: 'configs' }
);

module.exports = Configs
