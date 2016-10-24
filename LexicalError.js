class LexicalError extends Error {
	constructor(character, position, code) {
		super(`Syntax Error at position ${position}, character '${character}' not recognized. Here: '${code}'.`)
		this.character = character 
		this.position = position
		this.code = code
	}
}

module.exports = LexicalError