const { DataSource } = require("apollo-datasource")

module.exports = class CasesAPI extends DataSource{
    getCases() {
        return {
            total: 1,
            items: []
        }
    }
}