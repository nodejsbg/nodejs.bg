
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

// User Model.
require('../models/user')();
var User = mongoose.model('User');

/**
 * TODO: update me.
 */
module.exports = function(req, res, next) {
  
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