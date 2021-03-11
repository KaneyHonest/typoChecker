'use strict';
$(function(){
  $(".lined").linedtextarea();
});
$(function(){




   


   var textareaLeft = $('#textareaLeft');
   var textareaRight = $('#textareaRight');
   
   var errorerea = $('#error');
   var matcherea = $('#match');

   

   textareaLeft.on('input', textMatch);
   textareaRight.on('input', textMatch);
   function textMatch() {
    
    var leftValue = textareaLeft.val();
    var rightValue = textareaRight.val();
    var dmp = new diff_match_patch();

    var diffs = dmp.diff_main( leftValue, rightValue );
    errorerea.html( dmp.diff_prettyHtml(diffs) );


    var diffs = dmp.diff_main( rightValue, leftValue );
    matcherea.html( dmp.diff_prettyHtml(diffs) );
   
  }

 
});