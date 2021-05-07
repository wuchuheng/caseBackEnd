require('dotenv').config()
const {ApolloServer} = require('apollo-server')
const CasesAPI = require('./datasources/CasesAPI')
const LoginAPI = require('./datasources/LoginAPI')
const UploadAPI = require('./datasources/UploadAPI')
const path = require('path');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const initDB = require('./boot/initDB')

global.BASE_PATH = __dirname

const DB = initDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    dataSources: () => ({
        CasesAPI: new CasesAPI({DB}),
        LoginAPI: new LoginAPI({DB}),
        UploadAPI: new UploadAPI({DB})
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
