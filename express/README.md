# express pg

### Error handling

node.js exists when "unresolved promise" or "unhandled error" happens. programmer must
handle errors properly to prevent unintended exits.

[Handle exceptions properly](http://expressjs.com/en/advanced/best-practice-performance.html#handle-exceptions-properly)

> Before diving into these topics, you should have a basic understanding of Node/Express error handling: using error-first callbacks, and propagating errors in middleware. Node uses an “error-first callback” convention for returning errors from asynchronous functions, where the first parameter to the callback function is the error object, followed by result data in succeeding parameters. To indicate no error, pass null as the first parameter. The callback function must correspondingly follow the error-first callback convention to meaningfully handle the error. And in Express, the best practice is to use the next() function to propagate errors through the middleware chain.

### Schema, Input Validation

TODO

### Project Structure

TODO

### API Documantation

TODO

### Express Generators

TODO  

Express + Typescript project generator?  
Are project generators really needed in simple projects?  
