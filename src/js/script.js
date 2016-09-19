$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('input, textarea').change(function() {
    $(this).removeClass('has-error');
  })
});
