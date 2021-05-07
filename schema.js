const {gql} = require('apollo-server')

const typeDefs = gql`
    """ 单个案例数据 """
    type Case {
        id: ID!
        """ 分类id """
        categoryId: Int!
        """ 案例封面 """
        conver: String!
        """ 案例展示图 """
        banners: [String]!
    }
    """ 案例数据分页 """
    type CaseConnection {
        total: Int!
        items: [Case]!
    }
    type Query {
        cases: CaseConnection!
    }
    type LoginRes {
        accessToken: String!
        expiredAt: Int!
    }
    type Mutation {
        login(username: String!, password: String!): LoginRes!
    }

`
module.exports = typeDefs
