
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
module.exports = function(app, mongoose, config) {
  
  // User Model.
  var User = mongoose.model('User');
  
  // Post Model.
  var Post = mongoose.model('Post');
  
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
    if (app.settings.env == 'development') {
      return next();
    }
    
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
  
  /**
   * Helpers.
   */
   
  app.helpers({
    secret: secret
  });
  
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
      req.session.userId = result._id;
      
      // Redirects to dashboard.
      res.redirect('/' + secret +'/posts');
    });
  });
  
  // Logout.
  app.del('/' + secret + '/sessions', restrict, function(req, res) {
    delete req.session.userId;
    res.redirect('/' + secret);
  });
  
  /**
   * Posts.
   */
   
  // GET /admin/posts
  app.get('/' + secret + '/posts', restrict, function(req, res) {
    Post.find(function(err, posts) {
      res.render('admin/posts/index', {
        posts: posts
      });
    });
  });
  
  // GET /admin/posts/new
  app.get('/' + secret + '/posts/new', restrict, function(req, res) {
    
  });
  
  // GET /admin/posts/edit
  app.get('/' + secret + '/posts/edit', restrict, function(req, res) {
    
  });
  
  // POST /admin/posts
  app.post('/' + secret + '/posts', restrict, function(req, res) {
    
  });
  
  // PUT /admin/posts/1
  app.put('/' + secret + '/posts/:id', restrict, function(req, res) {
    
  });
  
  // DELETE /admin/posts/1
  app.del('/' + secret + '/posts/:id', restrict, function(req, res) {
    
  });
  
  /**
   * Users.
   */
   
   // GET /admin/users
  app.get('/' + secret + '/users', restrict, function(req, res) {
    User.find(function(err, users) {
      res.render('admin/users/index', {
        users: users
      });
    });
  });

  // GET /admin/users/new
  app.get('/' + secret + '/users/new', restrict, function(req, res) {
    res.render('admin/users/form', { user: {} });
  });

  // GET /admin/users/edit
  app.get('/' + secret + '/users/edit', restrict, function(req, res) {
    
  });

  // POST /admin/users
  app.post('/' + secret + '/users', restrict, function(req, res) {
    // Validate and save
    res.render('admin/users/form', { user: req.body.user });
  });

  // PUT /admin/users/1
  app.put('/' + secret + '/users/:id', restrict, function(req, res) {

  });

  // DELETE /admin/users/1
  app.del('/' + secret + '/users/:id', restrict, function(req, res) {

  });
};