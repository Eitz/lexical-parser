'use strict';

const Lex = require('./Lex.js')


let input = 'block { int a = 0 int b = 3 if (a < b && b > a) { print("Hello World") } }'

// You can specify an exact string or a regex for the token
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
	'int',
	['integer', /[0-9]+/],
	['id', /[a-zA-Z][a-zA-Z0-9]*/],
	['string', /\".*?\"/]
]
// The pattern to ignore in the input
let ignorePattern = '[\n\s \t]+'

let lex = new Lex(input, tokenMatchers, ignorePattern)
let token = undefined
try {
	do {
		token = lex.nextToken()
		console.log(token)
	} while (token)
} catch (err) {
	// Error handling
	if (err.code === "LEXICAL_ERROR") {
		console.log(`\n${err.message}\n`)
		console.log(`Position: ${err.position}`)
		console.log(`Character: ${err.character}`)
		console.log(`Nearby code: ${err.nearbyCode}`)
	}
	else
		console.log(err)
}