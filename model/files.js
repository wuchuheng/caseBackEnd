const {Model} = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')

class Files extends Model { }

Files.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        path: SQL.STRING,
        updatedAt: SQL.DATE
    }, { sequelize, modelName: 'files' }
);

module.exports = Files
