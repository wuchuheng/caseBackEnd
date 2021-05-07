module.exports = {
    Query: {
        cases: (_, __, { dataSources }) => dataSources.CasesAPI.getCases()
    },
    Mutation: {
        login: (_, {username, password}, { dataSources }) => dataSources.LoginAPI.getToken(username, password)
    }
}