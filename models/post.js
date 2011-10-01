
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module dependencies.
 */
var validator = require('../lib/validator');
 
/**
 * Post Model.
 */
var Post = new mongoose.Schema({
  'title': { type: String, validate: [validator.validatePresenceOf, 'empty']},
  'permlink': String,
  'summary': String,
  'content': String,
  'category_id': { type: mongoose.Schema.ObjectId, ref: 'Category' },
  'user_id': { type: mongoose.Schema.ObjectId, ref: 'User' },
  'created_at': { type: Date, default: Date.now }
});

// Defines the model.
mongoose.model('Post', Post);

/**
 * Module exports.
 */
module.exports = mongoose.model('Post');