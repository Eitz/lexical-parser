'use strict';
class Token {
	constructor(name, lexeme, position) {
		this.name = name
		this.lexeme = lexeme
		this.position = position
	}
}
module.exports = Token