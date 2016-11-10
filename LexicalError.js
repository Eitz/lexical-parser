'use strict';

class LexicalError extends Error {
	constructor(character, position, nearbyCode) {
		super(`Lexical error at position ${position}, character '${character}' not recognized. Here: '${nearbyCode}'.`)
		this.code = "LEXICAL_ERROR"
		this.character = character 
		this.position = position		
		this.nearbyCode = nearbyCode
	}
}

module.exports = LexicalError