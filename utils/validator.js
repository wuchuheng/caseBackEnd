const bcrypt = require('bcrypt');

module.exports.encrypt = (str) => bcrypt.hash(str, process.env.ENCRYPT_SALT)

module.exports.compare = (str, encrypted) => bcrypt.compare(str, encrypted)