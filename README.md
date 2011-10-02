# Nodejs.bg - Bulgarian Node.js User Group

This is the code repository for nodejs.bg

## Getting Started

Install and configure Node.js, NPM and MongoDB:

*	[Node.js](http://nodejs.org/)
*	[NPM](http://npmjs.org/)
*	[MongoDB](http://www.mongodb.org/)

Optional:
	
*	[nodemon](http://remy.github.com/nodemon/) - Automatically restart the server on any change.
*	[NVM](https://github.com/creationix/nvm) - Simple bash script to manage multiple active Node.js versions.
*	[Redis](http://redis.io/) - You can use Redis for persistent sessions storage.

Get the code:

	$ git clone git@github.com:nodejsbg/nodejs.bg.git

Install dependencies:

	$ npm install
  
Rename config/config.example.js to config.js && rename config/db.example.js to db.js

Change the session secret key in config/config.js.

Update the database configurations (config/db.js).

Fire up the server:

	$ node app.js
  
Site: http://localhost:6969
Admin: http://localhost:6969/admin/

To add new administrator:
	$ cd bin/
	$ ./nodejsbg -u username -p password

Win!

## TODO list

* Test cases
* Better environment handling

## Contributing

There are many ways to contribute depending on your specific interests.
The only thing you need is a desire to help improve the site.

In order to keep the contributing as easy is possible we use the Vincent Driessen's [branching model](http://nvie.com/git-model).
Please make sure you get familiar with [git-flow](https://github.com/nvie/gitflow).

## License

(The MIT License)

Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.