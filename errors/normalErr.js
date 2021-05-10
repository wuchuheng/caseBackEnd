/**
 * 重新登录错误码
 */
const {ApolloError} = require('apollo-server-errors')

module.exports = class extends ApolloError
{
    constructor(message = '没有这个账号或密码不正确') {
        super(message, '40000');
    }
}
