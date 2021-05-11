const { DataSource } = require("apollo-datasource")
const cases = require('../model/cases')
const file = require('../model/files')
const { Op } = require("sequelize");
const users = require('../model/users')

module.exports = class CasesAPI extends DataSource {
    async getCases({page, pageSize, keyword, categoryId}) {
        const offset = (page - 1) * pageSize
        const limit = pageSize
        const query = {where: {
            uid: {
                [Op.ne]: null
            },
            label: {
                [Op.like]: `%${keyword}%`
            },
            ...(categoryId ? {categoryId} : {})
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
                categoryId: category,
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
        const  where = { uid: { [Op.ne]: null } }
        const total = await cases.count({where: {...where}})
        const android = await cases.count({where: {type: 'android', ...where } })
        const ios = await cases.count({where: {type: 'ios', ...where }})
        return {total, android, ios}
    }

    async getCaseById(id)
    {
        const item = await cases.findOne({where: {id}})
        return this._getFormatItem(item)
    }

    async _getFormatItem(item)
    {
        if (!item) return item
        item.icon = await file.getFileById(item.iconFileId)
        item.file = await file.getFileById(item.fileId)
        item.cover = await file.getFileById(item.coverFileId)
        item.banner = JSON.parse(item.bannerFileIds).map(async item => await file.getFileById(item) )
        item.detail = await file.getFileById(item.detailFileId)
        return item
    }

    async updateCase({ id, label, iconFileId, coverFileId, bannerFileIds, desc, remark })
    {
        await cases.update({
            id,
            label,
            iconFileId,
            coverFileId,
            bannerFileIds: JSON.stringify(bannerFileIds),
            desc,
            remark,
        }, {where: {id}})

        return await this.getCaseById(id)
    }
}

