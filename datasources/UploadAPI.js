'use strict'
const { DataSource } = require("apollo-datasource")

module.exports = class UploadAPI extends DataSource{
    constructor({ DB }) 
    {
        super();
        this.DB = DB
    }

    /**
     * 单文件上传
     * @param file
     * @param base64File
     * @returns {Promise<number>}
     */
    async singleUpload(file, base64File)
    {
        console.log(file)
        console.log(base64File)
        return 1
    }
}
