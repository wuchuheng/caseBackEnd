const { DataSource } = require("apollo-datasource")
const validator = require("../utils/validator")
const jwt = require("../utils/jwt")
const normalErr = require("./../errors/normalErr")

module.exports = class LoginAPI extends DataSource{
    constructor({ DB }) 
    {
        super();
        this.DB = DB
    }

    async getToken(username, password)
    {
        const user = await (await this.DB).users.findOne({ where: { username } })
        const err = new normalErr()
        if (user === null) throw err
        const isValidatePassword = await validator.compare(password, user.password)
        if (!isValidatePassword) throw err
        return jwt.getToken({ id: user.id })
    }
}
