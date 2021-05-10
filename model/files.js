const {Model} = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')
const fileStore = require('../utils/fileStorage')

class Files extends Model {
    static getFileById(id)
    {
        return new Promise((resolve) => {
            this.findOne({where: {id}}).then(({path}) => resolve({id, url: fileStore.url(path)})
            )
        })
    }
}

Files.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        path: SQL.STRING,
        updatedAt: SQL.DATE
    }, { sequelize, modelName: 'files' }
);

module.exports = Files
