
/*!
 * Nodejs.bg
 * 
 * Node.js Bulgarian User Group
 * Copyright (c) 2011 Veselin Todorov <hi@vesln.com> & Martin Lazarov <martin@lazarov.bg>
 * Licensed under the MIT License.
 */

$(function() {
  
  // Delete buttons confirmation.
  $('.delete').bind('submit', function(e) {
    if (!confirm('Сигурен? Няма връщане назад!')) {
      e.preventDefault();
      return false;
    }
  });
  
  // WYSIWYG editor.
  var params = {
    buttonList: [
      'fontFormat',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'ul',
      'ol',
      'image',
      'xhtml'
    ],
    iconsPath : '/img/nicEditorIcons.gif'
  };
  
  $.each(['editor', 'summary'], function(i, id) {
    if ($('#' + id).length) {
      new nicEditor(params).panelInstance(id);
    }
  });
  
  // Permlinks.
  if ($('#src').length) {
    $('#src').slugIt({ 
      output: '#permlink',
      map: {
        'ъ':'u', 
        'Ъ':'U'
      }
    });
  }
  
});