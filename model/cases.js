const {Model} = require('sequelize');
const SQL = require('sequelize')
const sequelize = require('../config/sequelize')
const files = require('./files')

class Cases extends Model {
        /**
         *
         * @returns {Promise<void>}
         */
        static async add(packInfo)
        {
                const {path, ...other} = packInfo
                const file = await files.create({path})
                const {dataValues: {id: iconFileId}} = await files.create({path: packInfo.iconPath})
                const {id: fileId} = file.dataValues
                const newPackInfo = {...other, fileId, iconFileId}
                const storeData = await this.create(newPackInfo)
                return {
                        id: storeData.dataValues.id,
                        ...newPackInfo
                }
        }
}

Cases.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        uid: SQL.NUMBER,
        label: SQL.STRING,
        version: SQL.STRING,
        size: SQL.NUMBER,
        iconFileId: SQL.STRING,
        type: SQL.STRING,
        fileId: SQL.NUMBER,
        coverFileId: SQL.NUMBER,
        bannerFileIds: SQL.STRING,
        desc: SQL.STRING,
        remark: SQL.STRING,
        detailFileId: SQL.NUMBER,
        categoryId: SQL.NUMBER,
        updatedAt: SQL.DATE
    }, { sequelize, modelName: 'cases' }
);

module.exports = Cases
