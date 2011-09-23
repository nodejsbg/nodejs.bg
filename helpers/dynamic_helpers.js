
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Module exports.
 * 
 * @param {Object} app
 */
module.exports = function(app) {
  
  app.dynamicHelpers({
    
    /**
     * Returns all flash messages.
     */
    messages: function(req, res) {
      var messages = {
        error: 'error',
        success: 'success'
      };
      
      var html = '';
      
      Object.keys(messages).forEach(function(type) {
        var items = req.flash(type);
        if (items.length > 0) {
          html += '<div class="alert-message ' + messages[type] +'">';
          items.forEach(function(item) {
            html += item;
          });
          html += '</div>';
        }
      });
      
      return html;
    }
  });
  
};