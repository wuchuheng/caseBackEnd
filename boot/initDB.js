const validator = require('../utils/validator')
const users = require('../model/users')
const categories = require('../model/categores')
const cases = require('../model/cases')
const files = require('../model/files')
const sequelize = require('../config/sequelize')
const configs = require('../model/configs')

module.exports.sequelize = sequelize

module.exports = async () => {
    // 添加账号填充数据
    await users.sync()
    const user = await users.findOne({where: {username: 'admin'}})
    if (user === null) {
        const password = await validator.encrypt('12345678')
        await users.create({ username: 'admin', password, role: 'ADMIN' })
    }

    await categories.sync()
    if (await categories.count() === 0 ) {
        await categories.create({name: '分类1'})
        await categories.create({name: '分类2'})
        await categories.create({name: '分类3'})
        await categories.create({name: '分类4'})
    }

    await cases.sync()
    await configs.sync()
    await files.sync()
    return {
        users,
        categories,
        cases,
        configs,
        files
    }
}
