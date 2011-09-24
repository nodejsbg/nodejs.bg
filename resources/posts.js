
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
module.exports = function(app) {

  // Home page.
  app.get('/', function(req, res) {
    Post.find()
    .sort('created_at', 'descending')
    .populate('user_id')
    .run(function(err, posts) {
      res.render('posts/index', {
        posts: posts
      });
    });
  });
  
  // Post single.
  app.get('/post/:permlink', middlewares, function(req, res) {
    
  });

};