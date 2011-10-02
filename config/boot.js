
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Object} express
 */
module.exports = function(app, express) {
  
  /**
   * Module dependencies.
   */
  var path = require('path');
  var i18n = require('i18n');

  // Root path.
  var root = path.dirname(__dirname);
  
  // Development.
   app.configure('development', function() {
     app.use(express.errorHandler({
       dumpExceptions: true,
       showStack: true
     }));
     // app.use(express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }));
   });

   // Production.
   app.configure('production', function() {
     app.use(express.errorHandler());

     // Save me!
     process.on('uncaughtException', function(err) {
       console.log( " UNCAUGHT EXCEPTION " );
       console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
     });

   });
  
  // Configurations.
  app.configure(function() {
    app.set('views', root + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: app.config.session.secret }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(root + '/public'));
  });
  
  // I18n.
  i18n.configure({
      // supported locales
      locales: app.config.locales,
      locale: app.config.locale,
      // where to register __() and __n() to
      register: global
  });
  
};
