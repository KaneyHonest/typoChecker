'use strict';
$(function(){
  $(".lined").linedtextarea(
  );
  
});
$(function(){
  $(".linedtextarea").prepend('<div class="null"></div>');
  $(".null").prepend('<div class="textareaBack"></div>');
  $(".textareaBack").each(function(i) {
    var leftRight = ['Left', 'Right'];
    $(this).attr('id', 'textareaBack' + leftRight[i]);
    $(this).addClass("scroll" + leftRight[i]);
  });
   
  var scrollLeft = $(".scrollLeft");
  var scrollRight = $(".scrollRight");

  var leftarea = $('#textareaBackLeft');
  var rightarea = $('#textareaBackRight');

  var textareaLeft = $('#textareaLeft');
  var textareaRight = $('#textareaRight');
   
  textareaLeft.on('input', textMatch);
  textareaRight.on('input', textMatch);
   
  function textMatch() {
    $(".lined").css('background-color', 'transparent');
    $(".lined").css('color', 'transparent');
    $(".lined").css('caret-color', 'black');

    var leftValue = textareaLeft.val();
    var rightValue = textareaRight.val();
    
    var dmp = new diff_match_patch();
    
    var diffs = dmp.diff_main( leftValue, rightValue );
    leftarea.html( b(diffs) );
    var diffs = dmp.diff_main( rightValue, leftValue );
    rightarea.html( a(diffs) );
    
    function a(diffs) {
      var html = [];
      var pattern_amp = /&/g;
      var pattern_lt = /</g;
      var pattern_gt = />/g;
      var pattern_para = '↵';
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];    // Operation (insert, delete, equal)
        var data = diffs[x][1];  // Text of change.
        var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
            .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
        switch (op) {
          case DIFF_INSERT:
            html[x] = '';
            break;
          case DIFF_DELETE:
            html[x] = '<span style="background:#43FF6B;">' + text + '</span>';
            break;
          case DIFF_EQUAL:
            html[x] = '<span>' + text + '</span>';
            break;
        }
      }
      return html.join('');
    };
    
    function b(diffs) {
      var html = [];
      var pattern_amp = /&/g;
      var pattern_lt = /</g;
      var pattern_gt = />/g;
      var pattern_para = '↵';
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];    // Operation (insert, delete, equal)
        var data = diffs[x][1];  // Text of change.
        var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
            .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
        switch (op) {
          case DIFF_INSERT:
            html[x] = '';
            break;
          case DIFF_DELETE:
            html[x] = '<span style="background:#FF0033;">' + text + '</span>';
            break;
          case DIFF_EQUAL:
            html[x] = '<span>' + text + '</span>';
            break;
        }
      }
      return html.join('');
    };
  }

  textareaRight.scroll(function() {
    var textareaScrollTopRight = $(this).scrollTop();
    scrollRight.scrollTop(textareaScrollTopRight);
  });

  textareaLeft.scroll(function() {
    var textareaScrollTopLeft = $(this).scrollTop();
    scrollLeft.scrollTop(textareaScrollTopLeft);
  });

});