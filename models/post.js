
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module exports.
 */
module.exports = function() {
  
  /**
   * Module dependencies.
   */
  var validator = require('../lib/validator');
  
  /**
   * Post Model.
   */
  var Post = new mongoose.Schema({
    'title': { type: String, validate: [validator.validatePresenceOf, 'empty']},
    'summary': String,
    'content': String,
    'category_id': mongoose.Schema.ObjectId,
    'user_id': { type: mongoose.Schema.ObjectId, ref: 'User' },
    'created_at': { type: Date, default: Date.now }
  });
  
  mongoose.model('Post', Post);
  
};