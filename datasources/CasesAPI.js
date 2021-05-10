const { DataSource } = require("apollo-datasource")
const cases = require('../model/cases')

module.exports = class CasesAPI extends DataSource{
    getCases() {
        return {
            total: 1,
            items: []
        }
    }

    async createCase({
                   id,
                   label,
                   bannerFileIds,
                   category,
                   coverFileId,
                   desc,
                   detailFileId,
                   iconFileId,
                   remark,
               })
    {
        await cases.update(
            {
                label,
                bannerFileIds: JSON.stringify(bannerFileIds),
                category,
                coverFileId,
                desc,
                detailFileId,
                iconFileId,
                remark,
            },
            {where: {id}}
        )
        return 1
    }
}
