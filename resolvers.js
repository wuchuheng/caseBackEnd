module.exports = {
    Query: {
        cases: (_, {page, pageSize, keyword, categoryId}, { dataSources }) => dataSources.CasesAPI.getCases({page, pageSize, keyword, categoryId}),
        categories: (_, __, { dataSources }) => dataSources.CategoriesAPI.getCategories(),
        summary: (_, __, {dataSources}) => dataSources.CasesAPI.summary(),
        case: (_, {id}, {dataSources}) => dataSources.CasesAPI.getCaseById(id)
    },
    Mutation: {
        login: (_, {username, password}, { dataSources }) => dataSources.LoginAPI.getToken(username, password),
        create: (_, {
            id,
            label,
            bannerFileIds,
            category,
            coverFileId,
            desc,
            detailFileId,
            iconFileId,
            remark,
        }, {dataSources, ...ctx}) => dataSources.CasesAPI.createCase(ctx, {
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
    }
}
