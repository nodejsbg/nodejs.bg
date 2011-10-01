
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

/**
 * Returns all flash messages.
 * 
 * @param {Object} req Request.
 * @param {Object} res Response.
 * @returns {String}
 */
module.exports.messages = function(req, res) {
  
  // Type -> class map.
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

};