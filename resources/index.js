
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
  
  // Pages Model.
  var Page = require('../models/page');
  var Category = require('../models/category');
  
  // Sets pages for the navigation.
  // TODO: fix me
  app.get('*', function(req, res, next) {
    Page.find({}, function(err, pages) {
      res.local('pages', pages);
      Category.find({}, function(err, categories) {
        res.local('categories', categories);
        next();
      });
    });
  });
  
  // Posts.
  require('./posts')(app);
  
  // Pages.
  require('./pages')(app);
  
  // Categories.
  require('./pages')(app);
  
  // Admin resources.
  require('./admin')(app);
  
};