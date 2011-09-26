
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
  
  var Category = require('../models/category');
  var Post = require('../models/post');
  
  // Category.
  app.get('/category/:permlink', middlewares, function(req, res) {
    
    Category.findOne({ permlink: req.params.permlink }, function(err, category) {
      if (err || !category) {
        return res.send(404);
      }
      
      Post.find({ category_id: category._id })
        .sort('created_at', -1)
        .run(function(err, posts) { 
          res.render('categories/view', {
            posts: posts,
            category: category
          });
        });
    });
  });
};