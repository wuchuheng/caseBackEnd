const fs = require('fs')
const SQL = require('sequelize')
const bcrypt = require('bcrypt');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/store.sqlite',
    logging: false
});

module.exports = async () => {
    // 用户表
    class users extends Model {}
    users.init({
            id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
            username: SQL.STRING,
            password: SQL.STRING,
            createdAt: SQL.DATE,
            updatedAt: SQL.DATE
        }, { sequelize, modelName: 'users' }
    );
    await users.sync()
    const user = await users.findOne({where: {username: 'admin'}})
    if (user === null) {
        const password = await bcrypt.hash('12345678', process.env.ENCRYPT_SALT)
        await users.create({ username: 'admin', password })
    } 

    class category extends Model {}
    category.init({
        id: {type: SQL.INTEGER, primaryKey: true, autoIncrement: true},
        name: SQL.STRING,
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE
    }, {sequelize, modelName: 'category'})
    await category.sync()

    return {
        users,
        category
    }
}
