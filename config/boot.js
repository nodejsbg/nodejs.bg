
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

// Path Module.
var path = require('path');

// Root path.
var root = path.dirname(__dirname);

module.exports = function(app, express) {
  
  // Configurations.
  app.configure(function(){
    app.set('views', root + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(root + '/public'));
  });
  
};