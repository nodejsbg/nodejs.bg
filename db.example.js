
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
module.exports = {
  
  // Development.
  development: {
    database: 'node_development',
    username: 'dev',
    password: 'dev',
    hostname: 'localhost',
    port: 27017,
  },
  
  // Production.
  production: {
    database: 'node_production',
    username: 'secureuser',
    password: 'secretpassword',
    hostname: 'localhost',
    port: 27017
  }
  
};