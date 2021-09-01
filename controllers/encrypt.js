const crypto = require('crypto')

module.exports = function encrypt(name, password, key_iv){
	let cipher = crypto.createCipheriv('aes-256-cbc', key_iv[0], key_iv[1])
	let encrypted = cipher.update(password, 'utf-8', 'hex')
	encrypted += cipher.final('hex')

	return encrypted
}