$(function() {

  $('.delete').bind('click', function(e) {
    if (!confirm('Сигурен? Няма връщане назад!')) {
      e.preventDefault();
      return false;
    }
  });
  
});