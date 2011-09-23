
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
  
  // Category Model.
  var Category = mongoose.model('Category');
  
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
   * Additional helpers.
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
    req.flash('success', 'До скоро!');
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
    res.render('admin/users/new');
  });

  // GET /admin/users/edit
  app.get('/' + secret + '/users/edit/:id', restrict, function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if (err) {
        req.flash('error', 'Тоя не го знам.');
        return res.redirect('/' + secret + '/users');
      }
      res.render('admin/users/edit', { user: user });
    });
  });

  // POST /admin/users
  app.post('/' + secret + '/users', restrict, function(req, res) {
    req.flash('error', 'Грешка!');
    // Validate and save
    res.render('admin/users/new', { user: req.body.user });
  });

  // PUT /admin/users/1
  app.put('/' + secret + '/users/:id', restrict, function(req, res) {

  });

  // DELETE /admin/users/1
  app.del('/' + secret + '/users/:id', restrict, function(req, res) {

  });
  
  /**
   * Categories.
   */
   
   // GET /admin/categories
   app.get('/' + secret + '/categories', restrict, function(req, res) {
     
     Category.find(function(err, categories) {
       res.render('admin/categories/index', {
         categories: categories
       });
     });
     
   });

   // GET /admin/categories/new
   app.get('/' + secret + '/categories/new', restrict, function(req, res) {
     res.render('admin/categories/new');
   });

   // GET /admin/categories/edit
   app.get('/' + secret + '/categories/edit/:id', restrict, function(req, res) {
     Category.findOne({ _id: req.params.id }, function(err, category) {
       if (err) {
         req.flash('error', 'Опа. Нещо тая категорийка липсва.');
         return res.redirect('/' + secret + '/categories');
       }
       res.render('admin/categories/edit', { category: category });
     });
   });

   // POST /admin/categories
   app.post('/' + secret + '/categories', restrict, function(req, res) {
     var category = new Category(req.body.category);
     category.save(function(err) {
       if (err) {
         req.flash('error', 'Има нещо сгрешено.');
         return res.render('admin/categories/new', { category: req.body.category });
       }
       req.flash('error', 'Добавихме нова категория.');
       res.redirect('/' + secret + '/categories');
     });
   });

   // PUT /admin/categories/1
   app.put('/' + secret + '/categories/:id', restrict, function(req, res) {
     Category.update({ _id:  req.params.id}, req.body.category, function(err, count) {
       // Nothing found?
        if (err || !count) {
          req.flash('error', 'Не я намерих тая.');
          return res.render('admin/categories');
        }
        req.flash('success', 'Разцепихме я тая категория.');
        res.redirect('/' + secret + '/categories/edit/' + req.params.id);
     });
   });

   // DELETE /admin/categories/1
   app.del('/' + secret + '/categories/:id', restrict, function(req, res) {

   });
};