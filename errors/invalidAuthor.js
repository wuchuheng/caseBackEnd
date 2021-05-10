/**
 * 重新登录错误码
 */
const {ApolloError} = require('apollo-server-errors')

module.exports = class extends ApolloError
{
    constructor(message = '登录失效，请重新登录') {
        super(message, '50000');
    }
}
