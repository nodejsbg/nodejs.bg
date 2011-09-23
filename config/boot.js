
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
var path = require('path');

// Root path.
var root = path.dirname(__dirname);

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Object} express
 */
module.exports = function(app, express) {
  
  // Configurations.
  app.configure(function(){
    app.set('views', root + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: app.config.session.secret }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(root + '/public'));
  });
  
};