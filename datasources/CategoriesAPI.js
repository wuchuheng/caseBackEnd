const { DataSource } = require("apollo-datasource")

module.exports = class CasesAPI extends DataSource{
    constructor({DB}) {
        super();
        this.DB = DB
    }

    async getCategories() {
        const DB = await this.DB
        return await DB.categories.findAll()
    }
}
