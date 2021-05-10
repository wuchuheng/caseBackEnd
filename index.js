require('dotenv').config()
const {ApolloServer} = require('apollo-server')
const CasesAPI = require('./datasources/CasesAPI')
const LoginAPI = require('./datasources/LoginAPI')
const UploadAPI = require('./datasources/UploadAPI')
const CategoriesAPI = require('./datasources/CategoriesAPI')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const initDB = require('./boot/initDB')
const AuthDirective = require('./utils/AuthDirective')
const formatError = require('./errors/errorHandle')

const DB = initDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ headers: req.headers}),
    formatError,
    schemaDirectives: {
        auth: AuthDirective
    },
    dataSources: () => ({
        CasesAPI: new CasesAPI({DB}),
        LoginAPI: new LoginAPI({DB}),
        UploadAPI: new UploadAPI({DB}),
        CategoriesAPI: new CategoriesAPI({DB})
    })
})

const port = 5000
server.listen(port).then(() => {
    console.log(`
    Server is running!
    Listening on http://127.0.0.1:${port}
    Explore at https://studio.apollographql.com/dev
    `)
})
