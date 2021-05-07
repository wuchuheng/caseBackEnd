module.exports = {
    Query: {
        cases: (_, __, { dataSources }) => dataSources.CasesAPI.getCases()
    },
    Mutation: {
        login: (_, {username, password}, { dataSources }) => dataSources.LoginAPI.getToken(username, password),
        upload: (_, {name, fileBase64}, {dataSources}) => dataSources.UploadAPI.singleUpload(name, fileBase64)
    }
}
