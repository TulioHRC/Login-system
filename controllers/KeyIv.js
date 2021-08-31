module.exports = function key_iv(name){
	for(let i=1; i!=16; i++){
		name += String(name)
	}

	// Key
	let key = name.slice(0, 32)

	// Iv
	let iv = name.slice(0,16)

	return [key, iv]
}