'use strict';

//行数表示
$(function(){
  $(".lined").linedtextarea(
  );
  
});
$(function(){
  //textareaの裏にdivタグ生成
  $(".linedtextarea").prepend('<div class="null"></div>');
  $(".null").prepend('<div class="textareaBack"></div>');
  $(".textareaBack").each(function(i) {
    var leftRight = ['Left', 'Right'];
    $(this).attr('id', 'textareaBack' + leftRight[i]);
    $(this).addClass("backScroll" + leftRight[i]);
  });
   
  var leftareaBack = $('#textareaBackLeft');
  var rightareaBack = $('#textareaBackRight');

  var textareaLeft = $('#textareaLeft');
  var textareaRight = $('#textareaRight');

  var backScrollLeft = $(".backScrollLeft");
  var backScrollRight = $(".backScrollRight");

  //textareaとスクロール対応
  textareaRight.scroll(function() {
    var textareaScrollTopRight = textareaRight.scrollTop();
    backScrollRight.scrollTop(textareaScrollTopRight);
  });

  textareaLeft.scroll(function() {
    var textareaScrollTopLeft = textareaLeft.scrollTop();
    backScrollLeft.scrollTop(textareaScrollTopLeft);
  });
   
  //textareaにイベントが発生したなら
  textareaLeft.on('input', textMatch);
  textareaRight.on('input', textMatch);
   
  function textMatch() {

    //textareaの背景と文字を透明化
    $(".lined").css('background-color', 'transparent');
    $(".lined").css('color', 'transparent');
    $(".lined").css('caret-color', 'black');

    var leftValue = textareaLeft.val();
    var rightValue = textareaRight.val();
    
    //差分を求めてtextareaの裏に表示
    var dmp = new diff_match_patch();
    
    var diffs = dmp.diff_main( leftValue, rightValue );
    leftareaBack.html( diff_colorRed(diffs) );
    var diffs = dmp.diff_main( rightValue, leftValue );
    rightareaBack.html( diff_colorGreen(diffs) );
    
    function diff_colorGreen(diffs) {
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
    
    function diff_colorRed(diffs) {
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

    //イベント時もスクロール反応
    var textareaScrollTopRight = textareaRight.scrollTop();
    backScrollRight.scrollTop(textareaScrollTopRight);

    var textareaScrollTopLeft = textareaLeft.scrollTop();
    backScrollLeft.scrollTop(textareaScrollTopLeft);
  }

  //textareaからコピーする
  $('#copybtnLeft').on('click', function() {
    textareaLeft.select();
    document.execCommand('copy');
  })

  $('#copybtnRight').on('click', function() {
    textareaRight.select();
    document.execCommand('copy');
  })

  
  

});