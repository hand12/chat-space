$(document).on('turbolinks:load', function(){
  $('.chat-footer__submit').on("click", function(){
    var target = $('.chat-main')
    target.animate({scrollTop: $('.chat-body').height()});
    var scroll = target.scrollTop();
    console.log(scroll);
  });
})

