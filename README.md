# Lexical Parser (lexical-parser)

## About

Reads and "tokenizes" an input string given a set of string or regex patterns.

### Purpose

With this module you are able to make the string "int a = 5" become this:
```js
Token { name: 'int', lexeme: 'int', position: 0 }
Token { name: 'id', lexeme: 'a', position: 4 }
Token { name: '=', lexeme: '=', position: 6 }
Token { name: 'integer', lexeme: '0', position: 8 }
```

### Installing
 Install this module in your project by running:

```bash
$ npm install --save lexical-parser
```

### Roadmap

- [X] Get token by token
- [X] Get all the tokens all at once
- [ ] Output line numbers
- [ ] Implement events (onToken, onIgnoreInput)

## Example usage

```js
'use strict';

const Lex = require('lexical-parser')

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
```
### Output
```js
Token { name: 'block', lexeme: 'block', position: 0 }
Token { name: '{', lexeme: '{', position: 6 }
Token { name: 'int', lexeme: 'int', position: 8 }
Token { name: 'id', lexeme: 'a', position: 12 }
Token { name: '=', lexeme: '=', position: 14 }
Token { name: 'integer', lexeme: '0', position: 16 }
Token { name: 'int', lexeme: 'int', position: 18 }
Token { name: 'id', lexeme: 'b', position: 22 }
Token { name: '=', lexeme: '=', position: 24 }
Token { name: 'integer', lexeme: '3', position: 26 }
Token { name: 'if', lexeme: 'if', position: 28 }
Token { name: '(', lexeme: '(', position: 31 }
Token { name: 'id', lexeme: 'a', position: 32 }
Token { name: '<', lexeme: '<', position: 34 }
Token { name: 'id', lexeme: 'b', position: 36 }
Token { name: '&&', lexeme: '&&', position: 38 }
Token { name: 'id', lexeme: 'b', position: 41 }
Token { name: '>', lexeme: '>', position: 43 }
Token { name: 'id', lexeme: 'a', position: 45 }
Token { name: ')', lexeme: ')', position: 46 }
Token { name: '{', lexeme: '{', position: 48 }
Token { name: 'id', lexeme: 'print', position: 50 }
Token { name: '(', lexeme: '(', position: 55 }
Token { name: 'string', lexeme: '"Hello World"', position: 56 }
Token { name: ')', lexeme: ')', position: 69 }
Token { name: '}', lexeme: '}', position: 71 }
Token { name: '}', lexeme: '}', position: 73 }
undefined
```


