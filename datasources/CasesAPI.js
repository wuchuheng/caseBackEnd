const { DataSource } = require("apollo-datasource")
const cases = require('../model/cases')
const file = require('../model/files')

module.exports = class CasesAPI extends DataSource{
    async getCases({page, pageSize}) {
        const offset = (page - 1) * pageSize
        const limit = pageSize
        let items = await cases.findAll({offset, limit})
        items = items.map(async (e) => {
            e.icon = await file.getFileById(e.iconFileId)
            e.file = await file.getFileById(e.fileId)
            e.cover = await file.getFileById(e.coverFileId)
            e.banner = JSON.parse(e.bannerFileIds).map(async e => await file.getFileById(e) )
            e.detail = await file.getFileById(e.detailFileId)
            return e
        })

        return {
            total: 1,
            items
        }
    }

    async createCase(ctx, {
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
                uid: ctx.auth.id,
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
