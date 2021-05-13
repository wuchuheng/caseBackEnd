const { DataSource } = require("apollo-datasource")
const category = require("../model/categores")

module.exports = class CasesAPI extends DataSource{
    constructor({DB}) {
        super();
        this.DB = DB
    }

    async getCategories() {
        const DB = await this.DB
        return await DB.categories.findAll()
    }

    async updateCategory({id, name})
    {
        await category.update({name}, {where: {id}})
        return await category.findAll()
    }

    async create({name})
    {
        await category.create({name})
        return await category.findAll()
    }
}
