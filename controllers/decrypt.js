const crypto = require('crypto')

module.exports = function encrypt(name, password, key_iv){
	let decipher = crypto.createDecipheriv('aes-256-cbc', key_iv[0], key_iv[1])
	let decrypted = decipher.update(password, 'hex', 'utf-8')
	decrypted += decipher.final('utf-8')

	return decrypted
}