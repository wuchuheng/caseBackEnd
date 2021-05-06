module.exports = {
    Query: {
        cases: (_, __, { dataSources }) => dataSources.CasesAPI.getCases()
    }
}