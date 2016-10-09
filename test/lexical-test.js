'use strict';

const fs = require('fs')
const assert = require('assert')

const LexicalParser = require('../LexicalParser')
const TokenMatcher = require('../TokenMatcher')

describe('LexicalParser', function() {
	let input = fs.readFileSync("./test/example-language.txt", "utf8");
	let wrongInput = fs.readFileSync("./test/example-wrong-language.txt", "utf8");
	let tokenMatchers = [
  	new TokenMatcher('block'),
  	new TokenMatcher('if'),
  	new TokenMatcher('{'),
  	new TokenMatcher('}'),
  	new TokenMatcher('('),
  	new TokenMatcher(')'),
  	new TokenMatcher('<'),
  	new TokenMatcher('>'),
		new TokenMatcher('='),
		new TokenMatcher('&&'),
		new TokenMatcher('int'),
  	new TokenMatcher('integer', '[0-9]+'),
		new TokenMatcher('id', '[a-zA-Z][a-zA-Z0-9]*'),
		new TokenMatcher('string', '\".*?\"'),  
	]
	let ignorePattern = '[\n\s \t]+'
	
	describe('#constructor()', function() {
		let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
		it('should have a input exactly as passed in the constructor', function (){
			assert.equal(lex.input, input)
		})		 	
		it('should have 0 as the initial position', function (){
			assert.equal(lex.position, 0)
		})
	})

	describe('#nextToken()', function() {
		it('should have the first token named', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			let token = lex.nextToken()
			assert.equal(token.name, 'block')
		})
		it('should match { as the secondToken', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.lexeme, '{')	 	
		})
		it('should match \'int\' as reserved word', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, 'int')	 	
		})
		it('should match \'a\' as ID', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()			
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, 'id')	 	
		})
		it('and should have the lexeme as \'a\'', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()			
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.lexeme, 'a')	 	
		})
		it('should match string tokens', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			let token;
			do {
				token = lex.nextToken()
			} while (token && token.name != "string")
			assert.equal(token.lexeme, '"Hello World"')	 	
		})
		it('should give all the tokens, then undefined', function (){
			let lex = new LexicalParser(input, tokenMatchers, ignorePattern)
			let token
			do {
				token = lex.nextToken()
			} while (token)
			assert.equal(token, undefined)	 	
		})

		it('should give inteiro as `ID`', function (){
			let lex = new LexicalParser(wrongInput, tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, "id")	 	
		})
		it('and should give int as `int`', function (){
			let lex = new LexicalParser(wrongInput, tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, "int")	 	
		})
	})
})