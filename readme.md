# Module Mock
A simple module that uses the module "intercept-require" and provides
an easy to use interface to swap one module for another whenever any
part of your application requires it.

This is very useful for unit testing where you want to swap a module for a mock version that would
implement the same interface as the real module but provide mocked
responses.

## Install
```bash
npm i module-mock
```

## Usage
> It is very important that you require this module before any other
require calls that need to be mocked.

```js
const {replaceModule} = require("module-mock");
replaceModule("myLiveModule", require("myMockModule"));

// Now that we've asked to swap any require() call that asks for
// "myLiveModule" with the module "myMockModule" we can require()
// the live one and it will auto-swap. We can call this require
// anywhere in our application or other modules. For ease of reading
// we are requiring it here:
const myLiveModule = require("myLiveModule");

// "myLiveModule" is actually "myMockModule" at the moment!
const {describe, it} = require("mocha");

// Now we can do a contrived unit test example
describe("My Live Module", () => {
	it("Can connect correctly", () => {
		const response = myLiveModule.connect('http://www.foobar.com');
		// ... //
	});
});
``` 

## License
MIT or ISC or whatever license you want to use. Have at it.

## Author
Irrelon Software Limited - Rob Evans