const jwt = require('jsonwebtoken');
const fs = require('fs');
const invalidAuthor = require('../errors/invalidAuthor')

/**
 * 生成令牌
 * @param fields
 * @returns {{expiredAt: number, accessToken: (*)}}
 */
module.exports.getToken = (fields) => {
    const privateKey = fs.readFileSync(__dirname + '/../config/jwt/privateKey')
    const expiredAt = Math.floor(Date.now() / 1000 + Number(process.env.JWT_EXPIRED))
    const token = jwt.sign({ ...fields, iat: expiredAt }, privateKey, { algorithm: 'RS256' });
    return ({
        accessToken: token,
        expiredAt: expiredAt
    })
}

/**
 * 验签
 * @param token
 * @returns {Promise<unknown>}
 */
module.exports.verify= async (token) => {
    const publicKey = fs.readFileSync(__dirname + '/../config/jwt/publicKey')
    return new Promise((resolve, reject) => {
        jwt.verify(token,publicKey, { algorithm: 'RS256' }, (err, decoded) => {
            if (err !== null) return reject(new invalidAuthor('无效登录会话，请重新登录'))
            resolve(decoded)
        });
    })
}
