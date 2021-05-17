const fs = require('fs')
const FileStorage = require('../utils/fileStorage')
const moment = require('moment')
const AppInfoParser = require('app-info-parser')

/**
 * 解析apk包信息
 * @param file
 */
const parse = async (file) => {
    const packageInfo = {
        size: '',
        version: '',
        icon: '',
        label: ''
    }
    const parser = new AppInfoParser(file) // or xxx.ipa
    const result = await parser.parse()
    packageInfo.size = fs.statSync(file).size
    packageInfo.version = result.versionName
    const base64Data = result.icon.replace(/^data:image\/png;base64,/, "");
    const iconPath = `icons/${moment().format('YYYY-MM-DD')}/${Date.now()}.png`
    await FileStorage.put(iconPath, base64Data, 'base64')
    packageInfo.icon = iconPath
    packageInfo.label = result.application.label[0]
    return packageInfo

    // parser.parse(file, (_, info) => {
    //     const {applicationIcon} = info
    //     packageInfo.version = info.packageVersionName
    //     packageInfo.label = info.applicationLabel
    //     packageInfo.size = fs.statSync(file).size
    //     adbApkReader.open(file).then(reader => {
    //         reader.readContent(applicationIcon).then(async (image) => {
    //             const iconPath = `icons/${moment().format('YYYY-MM-DD')}/${Date.now()}.png`
    //             await FileStorage.put(iconPath, image)
    //             packageInfo.iconPath = iconPath
    //             const {dataValues: {id}} = await files.create({path: iconPath})
    //             resolve({...packageInfo, iconFileId: id, type: 'android'})
    //         })
    //     })
    // });
}

module.exports = parse
