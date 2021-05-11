const { DataSource } = require("apollo-datasource")
const cases = require('../model/cases')
const file = require('../model/files')
const { Op } = require("sequelize");

module.exports = class CasesAPI extends DataSource {
    async getCases({page, pageSize, keyword}) {
        const offset = (page - 1) * pageSize
        const limit = pageSize
        const query = {where: {
            label: {
                [Op.like]: `%${keyword}%`
            }
        }}
        let items = await cases.findAll({...query, offset, limit,  order: [ ['id', 'DESC'] ] })
        items = items.map(async e  => this._getFormatItem(e))

        const total = await cases.count(query)

        return { total, items }
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

    async summary()
    {
        const total = await cases.count()
        const android = await cases.count({where: {type: 'android'}})
        const ios = await cases.count({where: {type: 'ios'}})
        return {total, android, ios}
    }

    async getCaseById(id)
    {
        const item = await cases.findOne({where: {id}})
        return this._getFormatItem(item)
    }

    async _getFormatItem(item)
    {
        item.icon = await file.getFileById(item.iconFileId)
        item.file = await file.getFileById(item.fileId)
        item.cover = await file.getFileById(item.coverFileId)
        item.banner = JSON.parse(item.bannerFileIds).map(async item => await file.getFileById(item) )
        item.detail = await file.getFileById(item.detailFileId)
        return item
    }
}
