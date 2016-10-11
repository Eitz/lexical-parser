'use strict';

const Lex = require('./Lex')
const Token = require('./Token')
const TokenMatcher = require('./TokenMatcher')
const LexicalError = require('./LexicalError')

module.exports = {
	Lex: Lex,
	Token: Token,
	TokenMatcher: TokenMatcher, 
	LexicalError: LexicalError
}
