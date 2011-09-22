
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
/**
 * Uri Builder constructor.
 * 
 * @param {Object} db Database object.
 */
 
function UriBuilder(db) {
 this.hostname = db.hostname || 'localhost';
 this.database = db.database || 'local';
 this.username = db.username;
 this.password = db.password;
 this.port = db.port;
}

/**
 * To string method.
 *
 * @return {String} MongoDB URI.
 */
UriBuilder.prototype.toString = function() {
  var uri = 'mongodb://';
  
  if (this.username) {
    uri += this.username + ':' + this.password + '@';
  }
  
  uri += this.hostname;
  
  if (this.port) {
    uri += ':' + this.port;
  }
  
  if (this.database) {
    uri += '/' + this.database;
  }
  
  return uri;
};

/**
 * Module exports.
 */
 
module.exports = UriBuilder;