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
    type Category {
        id: Int!
        """ 分类名 """
        name: String!
    }
    type Query {
        cases: CaseConnection!
        """ 分类列表  """
        categories: [Category]!
    }
    type LoginRes {
        accessToken: String!
        expiredAt: Int
    }
    type UploadFile {
        name: String!
        fileBase64: String!
    }
    type Mutation {
        login(username: String!, password: String!): LoginRes!
        """ 创建案例 """
        create(
            id: Int!,
            label: String!, 
            bannerFileIds: [Int!]!,
            category: Int!,
            coverFileId: Int!,
            desc: String!,
            detailFileId: Int!,
            iconFileId: Int!,
            remark: String!,
        ): Int!
        
    }
`
module.exports = typeDefs
