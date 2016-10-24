# lexical-parser
Reads and "tokenizes" an input string given a set of string or regex patterns.

# Roadmap

- [X] Get token by token
- [ ] Output line numbers
- [ ] Get all the tokens all at once
- [ ] Implement events (onToken, onIgnoreInput)

# Example usage

**Warning:** This is still in alpha. You can can still attempt to use it but no guarantees!

```js
'use strict';

const Lex = require('lexical-parser/Lex')
const TokenMatcher = require('lexical-parser/TokenMatcher')
const LexicalError = require('lexical-parser/LexicalError')

// The string that you want to parse
let input = 'block { int a = 0 int b = 3 if (a < b && b > a) { print("Hello World") } }';
// Bad input for error testing:
// let input = 'block { int a = 0 int b = 3 if (^ < b && b > a) { print("Hello World") } }';

// Your tokenMatchers
// The first parameter is the name and the second is the regex to match it
// If the second parameter is ommitted, the match will be exactly the name of the token
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
	new TokenMatcher('string', '\".*?\"')
]
// The pattern to ignore in the input
let ignorePattern = '[\n\s \t]+'
// Instantiating the lexer
let lex = new Lex(input, tokenMatchers, ignorePattern)
// Generating tokens, safely!
let token = undefined
try {
	do {
		// token! token! token!
		token = lex.nextToken()
		console.log(token)
	} while (token)
} catch (err) {
	// Error handling :(
	if (err instanceof LexicalError) {
		console.log(`\n${err.message}\n`)
		console.log(`Position: ${err.position}`)
		console.log(`Character: ${err.character}`)
		console.log(`Nearby code: ${err.code}`)
	}
	else
		console.log(err)
}
```
### Output
```js
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


