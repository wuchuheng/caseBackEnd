const { DataSource } = require("apollo-datasource")
const validator = require("../utils/validator")
const jwt = require("../utils/jwt")

module.exports = class LoginAPI extends DataSource{
    constructor({ DB }) 
    {
        super();
        this.DB = DB
    }

    async getToken(username, password) {
        // return new Error('hello')
        const user = await (await this.DB).users.findOne({where: { username }})
        const err = new Error('没有这个账号或密码不正确')
        if (user === null ) throw err
        const isValidatePassword = await validator.compare(password, user.password)
        if (!isValidatePassword) throw err
        return jwt.getToken({id: user.id})
    }
}