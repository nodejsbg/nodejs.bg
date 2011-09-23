
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

module.exports = function(mongoose) {
  
  // Post Model.
  var Post = new mongoose.Schema({
    'title': { type: String, index: { unique: true } },
  });
  
  mongoose.model('Post', Post);
};