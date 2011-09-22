
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

module.exports = function(app) {
  
  // Index.
  app.get('/', function(req, res){
    
    res.render('index', {
      title: 'Express'
    });
    
  });
  
};