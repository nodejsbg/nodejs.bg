
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

function validatePresenceOf(value) {
  return value && value.length;
}

module.exports = function(mongoose) {
  
  // User Model.
  var User = new mongoose.Schema({
    'username': { type: String, validate: [validatePresenceOf, 'Username is required.'], index: { unique: true } },
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
    return this.encryptPassword(plainText) === this.password;
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