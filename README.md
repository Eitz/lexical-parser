# lexical-parser
Reads and "tokenizes" an input string given a set of string or regex patterns.

# Roadmap

- [X] Get token by token
- [ ] Get all the tokens all at once
- [ ] Implement events (onToken, onIgnoreInput)

# Example usage

**Warning:** This is still in alpha. You can can still attempt to use it but no guarantees!

```js

const Lex = require('../lexical-parser/Lex')
const TokenMatcher = require('../lexical-parser/TokenMatcher')
const LexicalError = require('../lexical-parser/LexicalError')

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
Token { name: 'block', lexeme: 'block', position: 0 }
Token { name: '{', lexeme: '{', position: 6 }
Token { name: 'int', lexeme: 'int', position: 9 }
Token { name: 'id', lexeme: 'a', position: 13 }
Token { name: '=', lexeme: '=', position: 15 }
Token { name: 'integer', lexeme: '0', position: 17 }
Token { name: 'int', lexeme: 'int', position: 20 }
Token { name: 'id', lexeme: 'b', position: 24 }
Token { name: '=', lexeme: '=', position: 26 }
Token { name: 'integer', lexeme: '3', position: 28 }
Token { name: 'if', lexeme: 'if', position: 32 }
Token { name: '(', lexeme: '(', position: 35 }
Token { name: 'id', lexeme: 'a', position: 36 }
Token { name: '<', lexeme: '<', position: 38 }
Token { name: 'id', lexeme: 'b', position: 40 }
Token { name: '&&', lexeme: '&&', position: 42 }
Token { name: 'id', lexeme: 'b', position: 45 }
Token { name: '>', lexeme: '>', position: 47 }
Token { name: 'id', lexeme: 'a', position: 49 }
Token { name: ')', lexeme: ')', position: 50 }
Token { name: '{', lexeme: '{', position: 52 }
Token { name: 'id', lexeme: 'print', position: 56 }
Token { name: '(', lexeme: '(', position: 61 }
Token { name: 'string', lexeme: '"Hello World"', position: 62 }
Token { name: ')', lexeme: ')', position: 75 }
Token { name: '}', lexeme: '}', position: 78 }
Token { name: '}', lexeme: '}', position: 80 }
undefined
```


