
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

// Models.
var Page = require('../models/page');
var Category = require('../models/category');

/**
 * Module exports.
 * 
 * @param {Object} req Request.
 * @param {Object} res Response.
 * @param {Function} next The next function.
 */
module.exports = function(req, res, next) {
  
  // Navigation.
  Page.find({}, function(err, pages) {
    res.local('pages', pages);
    
    // Categories.
    Category.find({})
      .sort('name', 1)
      .run(function(err, categories) {
        res.local('categories', categories);
        next();
    });
    
  });
};