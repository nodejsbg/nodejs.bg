// TODO: add docs

$(function() {

  $('.delete').bind('submit', function(e) {
    if (!confirm('Сигурен? Няма връщане назад!')) {
      e.preventDefault();
      return false;
    }
  });
  
});