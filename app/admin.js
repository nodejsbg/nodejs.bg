
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
module.exports = function(app, mongoose, config) {
  
  // Models.
  require('./models/user')(mongoose);
  
  var User = mongoose.model('User');
  
  // Secret.
  var secret = config.admin.secret;
  
  /**
   * Restrict middleware.
   * 
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  var restrict = function(req, res, next) {
    // Is id set?
    if (!req.session.userId) {
      return next(new Error(401));
    }
    
    // Checks if we have user with that id.
    User.count({_id: req.session.userId}, function(err, count) {
      if (!count) {
        return next(new Error(401));
      }
      next();
    });
  };
  
  // Login screen.
  app.get('/' + secret, function(req, res) {
    res.render('sessions/new.jade');
  });
  
  // Authentication.
  app.post('/sessions', function(req, res) {
    var user = req.body.user;
    
    User.findOne({ username: user.username }, function(err, result) {
      // Checks username and passwords.
      if (!result || !result.authenticate(user.password)) {
        req.flash('error', 'Опа. Не те познавам.');
        
        return res.redirect('/' + secret);
      }
      
      // Saves logged user id.
      req.session.userId = result.id;
      
      // Redirects to dashboard.
      res.redirect('/' + secret +'/posts');
    });
  });
  
  // Logout.
  app.del('/' + secret + '/logout', restrict, function(req, res) {
    
  });
  
  // posts#index.
  app.get('/' + secret + '/posts', restrict, function(req, res) {
    
  });
  
};