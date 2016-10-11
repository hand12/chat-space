$(document).on('turbolinks:load', function(){
  $('.chat-footer__submit').on("click", function(){
    scroll();
    $('#js-flash').fadeIn().delay(3000).fadeOut(500);
  });

  scroll();

  function scroll(){
    var target = $('.chat-main');
    target.animate({scrollTop: $('.chat-body').height()}, 500);
  }
})

