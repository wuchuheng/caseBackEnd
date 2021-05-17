const {getBasePath} = require('../utils/conf')
const fs = require('fs')
const fsPath = require('path')

const config = {
    url: 'http://case-upload.42.huizhouyiren.com',
    relativePath: '/uploads'
}

const getPath = async () => `${await getBasePath()}${config.relativePath}`

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
module.exports.put = async (savePath, content, writeOption = '') => {
    const fullPath = await path(savePath)
    const dir = fsPath.dirname(fullPath)
    !fs.existsSync(dir) && fs.mkdirSync(dir,  { recursive: true })
    writeOption !== '' ? fs.writeFileSync(fullPath, content, writeOption) : fs.writeFileSync(fullPath, content)
    return savePath
}

module.exports.url = path => `${config.url}/${path}`
