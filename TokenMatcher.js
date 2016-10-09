'use strict';

class TokenMatcher {
	constructor (name, regExp) {
		this.name = name
		this.isRegex = regExp ? true : false
		if (this.isRegex)
			this.setMatch(regExp)
		else
			this.setMatch(name)		
	}

	setMatch (value) {
		function escapeRegExp(str) {
  		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}
		if (!this.isRegex) {
			value = escapeRegExp(value)
		}		
		this.match = value	
	}
}

module.exports = TokenMatcher