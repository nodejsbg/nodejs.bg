// TODO: add docs

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
  
});