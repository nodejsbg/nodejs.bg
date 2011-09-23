
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module dependencies.
 */
var express = require('express');
var app = module.exports = express.createServer();
var UriBuilder = require('./lib/uri_builder');
app.config = require('./config/config');
global.mongoose = require('mongoose');

// Configurations.
var config = require('./config/config');

// Database configurations.
var db = require('./config/db');

// Bootstrap.
require('./config/boot.js')(app, express, config);

// Environments.
require('./config/env.js')(app, express);

// Database connection.
mongoose.connect((new UriBuilder(db[app.settings.env])).toString());

// Helpers.
require('./helpers/helpers.js')(app);

// Dynamic Helpers.
require('./helpers/dynamic_helpers.js')(app);

// Routes.
require('./config/routes.js')(app);

// Starting the server.
app.listen(config.server.port, function() {
  console.log('nodejs.bg listening on port %d in %s mode', app.address().port, app.settings.env);
});