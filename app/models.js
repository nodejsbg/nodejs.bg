/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

var crypto = require('crypto');

module.exports = function(mongoose) {
  
  function validatePresenceOf(value) {
    return value && value.length;
  }
  
  /**
   * Post Model.
   */
  var Post = new mongoose.Schema({
    'title': { type: String, index: { unique: true } },
    'body': String,
    'user_id': mongoose.Schema.ObjectId,
    'created_at': Date
  });
  
  mongoose.model('Post', Post);
  
  /**
   * Category Model.
   */
  var Category = new mongoose.Schema({
    'name': { type: String, validate: [validatePresenceOf, 'Няма име'], index: { unique: true } },
  });
  
  mongoose.model('Category', Category);
  
  /**
   * User Model.
   */
  var User = new mongoose.Schema({
    'username': { type: String, index: { unique: true } },
    'password': String,
    'salt': String
  });

  /**
   * Authenticate method.
   * 
   * @param {String} plainText Password in plain text.
   * @returns {Boolean} true if passwords are equal.
   */
  User.method('authenticate', function(plainText) {
    return this.hash(plainText) === this.password;
  });

  /**
   * Generates random salt.
   * 
   * @returns {String} salt.
   */
  User.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  });

  /**
   * Hashes a password.
   * 
   * @returns {String} hashed password.
   */
  User.method('hash', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  });

  mongoose.model('User', User);
};