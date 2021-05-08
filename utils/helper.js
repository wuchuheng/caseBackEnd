const moveFile = (file, toPath) => {
    return new Promise((resolve, reject) => {
        file.mv(toPath, err => {
            if(err) return reject(err)
            return resolve()
        })
    })
}

module.exports.moveFile = moveFile

