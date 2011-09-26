
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
 * @param {Object} app HTTPServer.
 */
module.exports = function(app, middlewares) {

  // Page Model.
  var Page = require('../models/page');

  // Page.
  app.get('/page/:permlink', middlewares, function(req, res) {
    Page.findOne({ permlink: req.params.permlink }, function(err, page) {
      if (err || !page) {
        res.send(404);
      }
      res.render('pages/index', {
        page: page
      });
    });
  });

};