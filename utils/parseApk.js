const parser = require('apkreader');
const adbApkReader = require('adbkit-apkreader')
const fs = require('fs')

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
                reader.readContent(applicationIcon).then(function(image) {
                    const iconPath = __dirname + '/image.png'
                    fs.writeFileSync(iconPath, image)
                    packageInfo.icon = iconPath
                    resolve(packageInfo)
                })
            })
        });
    })
}

module.exports = parse
