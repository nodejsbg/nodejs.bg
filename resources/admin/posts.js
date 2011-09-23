
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
// Category Model.
require('../../models/post')();
var Post = mongoose.model('Post');

/**
 * Module exports.
 * 
 * @param {Object} app
 * @param {Array} middlewares
 */
module.exports = function(app, middlewares) {

  // GET /admin/posts
  app.get('/' + app.config.admin.secret + '/posts', middlewares, function(req, res) {
    Post.find(function(err, posts) {
      res.render('admin/posts/index', {
        posts: posts
      });
    });
  });  
  
};