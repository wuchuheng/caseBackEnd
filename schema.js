const {gql} = require('apollo-server')

const typeDefs = gql`
    enum Role {
        ADMIN
        REVIEWER
        USER
        UNKNOWN
    }
    directive @auth(
        requires: Role = ADMIN,
    ) on OBJECT | FIELD_DEFINITION
    
    type File {
        id: Int!
        url: String!
    }
    enum AppType {
        android
        ios
    }
    """ 单个案例数据 """
    type Case {
        id: ID!
        uid: Int!
        label: String!
        version: String!
        size: Int!
        icon: File!
        type: AppType!
        file: File!
        cover: File!
        banner: [File]!
        detail: File!
        desc: String!
        remark: String!
        categoryId: Int!
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
    type Summary {
        total: Int!
        android: Int!
        ios: Int!
    }
    type Query {
        cases(
            page: Int! = 1,
            pageSize: Int! = 12,
            keyword: String! = ""
            categoryId: Int
        ): CaseConnection!
        """ 分类列表  """
        categories: [Category]!
        """  概要 """
        summary: Summary!
        """ 单个案例 """
        case(id: Int!): Case!
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
        create (
            id: Int!,
            label: String!, 
            bannerFileIds: [Int!]!,
            category: Int!,
            coverFileId: Int!,
            desc: String!,
            detailFileId: Int!,
            iconFileId: Int!,
            remark: String!,
        ): Int! @auth
        """ 修改案例 """
        updateCase(
            id: Int!
            label: String!
            iconFileId: Int!
            coverFileId: Int!
            bannerFileIds: [Int]!
            desc: String!
            remark: String!
        ): Case! @auth
        """ 删除案例 """
        deleteCase(caseId: Int): Int! @auth
        """ 更新新包信息 """
        updatePackage(
            """ 要修改的案例id """
            id: ID!
            """ 新上传包的id """
            packageId: Int!
        ): Int! @auth
        
    }
`
module.exports = typeDefs
