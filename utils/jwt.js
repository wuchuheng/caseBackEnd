const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.getToken = (fields) => {
    const privatekey = fs.readFileSync(__dirname + '/../config/jwt/privateKey')
    const expiredAt = Math.floor(Date.now() / 1000 + Number(process.env.JWT_EXPIRED))
    var token = jwt.sign({ ...fields, iat: expiredAt }, privatekey, { algorithm: 'RS256' });
    return ({
        accessToken: token,
        expiredAt: expiredAt
    })
}
