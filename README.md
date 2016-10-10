# lexical-parser
Lexical Parser written in Javascript, using Node.js's environment

# Example usage

**Warning:** This is still in alpha. You can can still attempt to use it but no guarantees!

```js

const LexicalParser = require('lexical-parser')
const Token = LexicalParser.Token
const TokenMatcher = LexicalParser.TokenMatcher
const Lex = LexicalParser.Lex

let input = 'block { int a = 0 int b = 3 if (a < b && b > a) { print("Hello World") } }';
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
let ignorePattern = '[\n\s \t]+'
let lex = new Lex(input, tokenMatchers, ignorePattern)
do {
	token = lex.nextToken()
	console.log(token)
} while (token)
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


