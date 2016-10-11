'use strict';

const Token = require('./Token')
const LexicalError = require('./LexicalError')

class Lex {
	
	constructor(input, tokenMatchers, ignorePattern) {
		if (input && typeof input == "string")
			this.input = this.workingInput = input
		this.ignorePattern = ignorePattern ? new RegExp("^" + ignorePattern, 'g') : ''
		this.setTokenMatcher(tokenMatchers || new Array())
		this.position = 0
	}

	setTokenMatcher(tokenMatchers) {
		if (tokenMatchers.length == 0)
			return

		tokenMatchers.sort(function (a, b) {
			if (a.isRegex && !b.isRegex)
				return false
			return true
		})
		
		let regExp = ''
		for(let i=0; i<tokenMatchers.length;i++) {
			if (i>0)
				regExp += '|'
			regExp += `(^${tokenMatchers[i].match})` 
		}

		this.tokenMatchers = tokenMatchers
		this.tokenMatcher = new RegExp(regExp, 'g')
	}

	nextToken() {
		while (this.workingInput.length > 0) {
			let result = this.workingInput.replace(this.tokenMatcher, this._replacer.bind(this))
			let difference = this.workingInput.length - result.length
			if (difference > 0) {
				this.position += difference
				this.workingInput = result
				return new Token(this._tempToken.name, this._tempToken.lex, this.position - this._tempToken.lex.length)
			}
			else if (!this.attemptToIgnoreChars())				
					this.parsingError()
		}
		return undefined
	}

	_replacer() {
		this._tempToken = undefined
		
		for(let i=1; i<arguments.length-2; i++) {
			if (arguments[i]) {
				this._tempToken = { name: this.tokenMatchers[i-1].name, lex: arguments[i], regexMatch: this.tokenMatchers[i-1].isRegex }
			}
		}
		
		// Attempt to match exact words
		if (this._tempToken && this._tempToken.regexMatch) {
				for (let t of this.tokenMatchers.filter( (tm) => !tm.isRegex )){
					if (t.name == this._tempToken.lex) {
					this._tempToken.name = t.name
					break;
				}
			}
		}
		
		return '';
	}

	attemptToIgnoreChars() {
		let result = this.workingInput.replace(this.ignorePattern, '')
		let difference = this.workingInput.length - result.length
		if (difference > 0) {
			this.workingInput = result
			this.position += difference
			return true
		}
		// Syntax Error
		return false;
	}

	parsingError() {
		let begin = this.position > 20 ? this.position - 20 : 0 
		let add = this.input.length > this.position + 20 ? 20 : this.input.length - this.position
		let errStrg = this.input.substring(begin, this.position + add)
		throw new LexicalError(this.workingInput[0], this.position, errStrg)
	}
}

module.exports = Lex