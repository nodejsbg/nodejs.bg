
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
   * Post Model.
   */
  var Post = new mongoose.Schema({
    'title': { type: String, index: { unique: true } },
    'content': String,
    'category_id': mongoose.Schema.ObjectId,
    'user_id': mongoose.Schema.ObjectId,
    'created_at': Date
  });
  
  mongoose.model('Post', Post);
  
};