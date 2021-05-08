const parser = require('apkreader');
const adbApkReader = require('adbkit-apkreader')
const fs = require('fs')
const FileStorage = require('../utils/fileStorage')
const moment = require('moment')
/**
 * 解析apk包信息
 * @param file
 */
const parse = (file) => {
    return new Promise((resolve) => {
        const packageInfo = {
            size: '',
            version: '',
            icon: '',
            label: ''
        }
        parser.parse(file, (_, info) => {
            const {applicationIcon} = info
            packageInfo.version = info.packageVersionName
            packageInfo.label = info.applicationLabel
            packageInfo.size = fs.statSync(file).size
            adbApkReader.open(file).then(reader => {
                reader.readContent(applicationIcon).then(async (image) => {
                    const iconPath = `icons/${moment().format('YYYY-MM-DD')}/${Date.now()}.png`
                    await FileStorage.put(iconPath, image)
                    packageInfo.icon = iconPath
                    resolve(packageInfo)
                })
            })
        });
    })
}

module.exports = parse
