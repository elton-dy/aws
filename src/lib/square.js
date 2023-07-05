function square(nb){
	if (typeof nb != "number"){
		throw new Error("Le paramètre doit être un chiffre.")
	}

	return nb * nb
}

module.exports = square