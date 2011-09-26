
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
 * @param {Object} app HTTPServer.
 */
module.exports = function(app, middlewares) {
  
  // Post model.
  var Post = require('../models/post');
  
  // Home page.
  app.get('/', middlewares, function(req, res) {
    // Current page.
    var page = req.param('page') || 0; 
    
    // Results per page.
    var perPage = 10; 
    
    Post.count({}, function(err, count) {
      Post.find({})
        .sort('created_at', -1)
        .populate('user_id')
        .populate('category_id')
        .skip(page * perPage)
        .limit(perPage)
        .run(function(err, posts) { 
          res.render('posts/index', {
            posts: posts,
            count: count
          });
        });
    });
  });
  
  // Post single.
  app.get('/post/:permlink', function(req, res) {
    
  });

};