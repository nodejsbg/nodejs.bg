
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
var crypto = require('crypto');
var validator = require('../lib/validator');
var mongoose = require('mongoose');

/**
 * User Model.
 */
var User = new mongoose.Schema({
  'username': { 
    type: String, 
    validate: new RegExp('^\d*[a-zA-Z][a-zA-Z0-9]*$'), 
    index: { unique: true } 
  },
  'password': String,
  'name': String,
  'salt': String
});

/**
 * Virtual field passwd.
 */
User.virtual('passwd')
  .set(function(password) { 
    this._passwd = password;
  })
  .get(function() { 
    return this._passwd; 
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

/**
 * Called before save.
 */
User.pre('save', function(next) {
  if (this.isNew) {
    this.salt = this.makeSalt();
  } else if (!this.passwd) {
    return next();
  }
  
  if (this.passwd.length < 5) {
    return next(new Error('Паролата трябва да е поне 5 символа'));
  }
  
  this.password = this.hash(this.passwd);
  next();
});

// Defines the model.
mongoose.model('User', User);

/**
 * Module exports.
 */
module.exports = mongoose.model('User');