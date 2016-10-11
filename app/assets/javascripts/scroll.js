$(document).on('turbolinks:load', function(){
  $('.chat-footer__submit').on("click", function(){
    var target = $('.chat-main');
    target.animate({scrollTop: $('.chat-body').height()}, 500);

    $('#js-flash').fadeIn().delay(3000).fadeOut(500);

  });
})

