'use strict';

const fs = require('fs')
const assert = require('assert')

const Lex = require('../Lex')
const TokenMatcher = require('../TokenMatcher')

describe('Lex', function() {
	let input = []
	input[0] = fs.readFileSync("./test/example-language.txt", "utf8");
	input[1] = fs.readFileSync("./test/example-wrong-language.txt", "utf8");
	input[2] = fs.readFileSync("./test/example-advanced-language.txt", "utf8");
	let tokenMatchers = [
  	'block',
  	'if',
  	'{',
  	'}',
  	'(',
  	')',
		'<',
  	'>',
		'=',
		'&&',
		'<=',
		'>=',
		'int',
  	['integer', /[0-9]+/],
		['id', /[a-zA-Z][a-zA-Z0-9]*/],
		['string', /\".*?\"/],  
	]
	let ignorePattern = '[\n\s \t]+'
	
	describe('#constructor()', function() {
		let lex = new Lex(input[0], tokenMatchers, ignorePattern)
		it('should have a input exactly as passed in the constructor', function (){
			assert.equal(lex.input, input[0])
		})		 	
		it('should have 0 as the initial position', function (){
			assert.equal(lex.position, 0)
		})
	})

	describe('#nextToken()', function() {
		it('should have the first token named', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			let token = lex.nextToken()
			assert.equal(token.name, 'block')
		})
		it('should match { as the secondToken', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.lexeme, '{')	 	
		})
		it('should match \'int\' as reserved word', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, 'int')	 	
		})
		it('should match \'a\' as ID', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()			
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, 'id')	 	
		})
		it('and should have the lexeme as \'a\'', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()			
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.lexeme, 'a')	 	
		})
		it('should match string tokens', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			let token;
			do {
				token = lex.nextToken()
			} while (token && token.name != "string")
			assert.equal(token.lexeme, '"Hello World"')	 	
		})
		it('should give all the tokens, then undefined', function (){
			let lex = new Lex(input[0], tokenMatchers, ignorePattern)
			let token
			do {
				token = lex.nextToken()
			} while (token)
			assert.equal(token, undefined)	 	
		})

		it('should give inteiro as `ID`', function (){
			let lex = new Lex(input[1], tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, "id")	 	
		})
		it('and should give int as `int`', function (){
			let lex = new Lex(input[1], tokenMatchers, ignorePattern)
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			lex.nextToken()
			let token = lex.nextToken()
			assert.equal(token.name, "int")	 	
		})
		it('and should match "<="', function (){
			let lex = new Lex(input[2], tokenMatchers, ignorePattern)
			lex.nextToken() // block
			lex.nextToken() // {
			lex.nextToken() // if
			lex.nextToken() // (
			lex.nextToken() // a
			let token = lex.nextToken() // <=
			assert.equal(token.name, "<")	 	
		})
			it('and should match "<="', function (){
			let lex = new Lex(input[2], tokenMatchers, ignorePattern)
			lex.nextToken() // block
			lex.nextToken() // {
			lex.nextToken() // if
			lex.nextToken() // (
			lex.nextToken() // a
			lex.nextToken() // <=
			lex.nextToken() // b
			lex.nextToken() // &&
			lex.nextToken() // b
			let token = lex.nextToken() // <
			assert.equal(token.name, "<=")	 	
		})
	})
})