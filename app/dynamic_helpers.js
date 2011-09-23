
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */
 
module.exports = function(app) {
  
  app.dynamicHelpers({
    errors: function(req, res) {
      var message = false;
      var errors = req.flash('error');

      if (errors.length > 0) {
        message = '';
        errors.forEach(function(error) {
          message += error;
        });
      }

      return message;
    }
  });
  
};