module.exports = {
    Query: {
        cases: (_, {page, pageSize}, { dataSources }) => dataSources.CasesAPI.getCases({page, pageSize}),
        categories: (_, __, { dataSources }) => dataSources.CategoriesAPI.getCategories()
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
