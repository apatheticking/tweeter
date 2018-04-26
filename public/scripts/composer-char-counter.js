$( document ).ready(function() {

    $( ".new-tweet textarea" ).on('keyup',function(e){
      const message = $(this).val();
      var remainder = 140 - message.length;
      $(".counter").text(remainder);

      if(remainder < 0){//if count is greater than the character limit change it red
        $(".counter").css("color", "red");
      } else if (remainder <= 140){ //if the character count is below the character count
        $(".counter").css("color", "black");
      }
    });

});

