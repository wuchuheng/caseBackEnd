const initDB = require('../boot/initDB')
const configs = require('../model/configs')

const set = async (key, value) => {
    const DB = await initDB()
    await DB.configs.findOrCreate( {where: {name: key, value}})
}
module.exports.set = set

const get = async (key) => {
    const DB = await initDB()
    const { value } = await DB.configs.findOne({ where: {name: key} });
    return value
}
module.exports.get = get


const basePathKey =  'base_path'

const portKey =  'port'
const setBasePath = (path) => {
    set(basePathKey, path).then()
}
module.exports.setBasePath = setBasePath

const setPort = (port) => set(portKey, port).then()
module.exports.setPort = setPort

const getPort = async () => await get(portKey)
module.exports.getPort = getPort

const getBasePath = async () => await get(basePathKey)
module.exports.getBasePath = getBasePath
