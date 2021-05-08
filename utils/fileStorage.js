const {getBasePath} = require('../utils/conf')
const fs = require('fs')
const fsPath = require('path')

const getPath = async () => {
    const relativePath = '/uploads'
    return `${await getBasePath()}${relativePath}`
}

/**
 *  获取路径
 * @param path
 * @returns {Promise<string>}
 */
const path = async (path) => `${await getPath()}/${path}`
module.exports.path = path

/**
 * 内容写入
 * @param savePath
 * @param content
 * @returns {Promise<*>}
 */
module.exports.put = async (savePath, content) => {
    const fullPath = await path(savePath)
    const dir = fsPath.dirname(fullPath)
    !fs.existsSync(dir) && fs.mkdirSync(dir,  { recursive: true })
    fs.writeFileSync(fullPath, content)
    return savePath
}
