module.exports = {
    Query: {
        cases: (_, __, { dataSources }) => dataSources.CasesAPI.getCases(),
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
        }, {dataSources}) => dataSources.CasesAPI.createCase({
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
