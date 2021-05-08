const initDB = require('../boot/initDB')
const configs = require('../model/configs')

const set = async (key, value) => {
    const DB = await initDB()
    await DB.configs.findOrCreate( {where: {name: key, value}})
}

module.exports.set = set

const basePathKey =  'base_path'
const setBasePath = (path) => {
    set(basePathKey, path).then()
}
module.exports.setBasePath = setBasePath

const getBasePath = async () => {
    const DB = await initDB()
    const { value } = await DB.configs.findOne({ where: {name: basePathKey} });
    return value
}
module.exports.getBasePath = getBasePath
