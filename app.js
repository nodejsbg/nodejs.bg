
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
var helpers = require('express-helpers');

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
// TODO: Add to separate file.
app.dynamicHelpers({
  errors: function(req, res) {
    var message = false;
    var errors = req.flash('error');
    
    if (errors.length > 0) {
      message = '';
      errors.forEach(function(error) {
        message += error;
      });
    }
    
    return message;
  }
});

app.helpers({
  link_to: helpers.link_to
});

// Frontend.
require('./app/site.js')(app);

// Backend.
require('./app/admin.js')(app, mongoose, config);

// Starting the server.
app.listen(config.server.port, function() {
  console.log('nodejs.bg listening on port %d in %s mode', app.address().port, app.settings.env);
});