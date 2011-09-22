
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
module.exports = function(app, mongoose) {
  
  // User Model.
  require('./models/user')(mongoose);
  var User = mongoose.model('User');
  
  // Login screen.
  app.get('/qosmos', function(req, res) {
    res.render('sessions/new.jade');
  });
  
  // Authentication.
  app.post('/sessions', function(req, res) {
    
  });
  
  // Logout.
  app.del('/sessions', function(req, res) {
    
  });
  
};