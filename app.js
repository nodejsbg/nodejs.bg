
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

var express = require('express');
var app = module.exports = express.createServer();
var mongoose = require('mongoose');
var UriBuilder = require('./lib/uri_builder');

// Configurations.
var config = require('./config/config');

// Database configurations.
var db = require('./config/db');

// Bootstrap.
require('./config/boot.js')(app, express, config);

// Environments.
require('./config/env.js')(app, express);

// Database connection.
var uriBuilder = new UriBuilder(db[app.settings.env]);
mongoose.createConnection(uriBuilder.toString());

// Frontend.
require('./app/site.js')(app);

// Backend.
require('./app/admin.js')(app, mongoose);

// Starting the server.
app.listen(config.server.port, function() {
  console.log('nodejs.bg listening on port %d in %s mode', app.address().port, app.settings.env);
});