$(document).on('turbolinks:load', function(){
  function add_message_component(message){
    var image_component =
      '<img src="'                      +
      message.image                     +
      '">'
    var body_component =
      '<p class="chat-message__body">'    +
      message.body                           +
      '</p>'
    if (message.image == null){
      image_component = '';
    } else {
      body_component = '';
    }
    var chat_message =
      '<li class="chat-message">'          +
      '<div class="chat-message__header">' +
      '<p class="chat-message__name">'     +
      message.name                         +
      '</p>'                               +
      '<p class="chat-message__time">'     +
      message.time                         +
      '</p>'                               +
      '</div><br>'                         +
      body_component                       +
      image_component                      +
      '</li>'
    $(".chat-messages").append(chat_message);
  }

  function scroll(){
    console.log("スクロールされた");
    var target = $('.chat-main');
    target.animate({scrollTop: $('.chat-body').height()}, 500);
  }

  function postMessage(){
    var fd = new FormData($("#new_message").get(0));
    var input = $("#js-input").val();
    console.log(fd);
    console.log(input);
    $.ajax({
      url: '/messages.json',
      type: 'POST',
      data: fd,
      processData: false,//これがtrueだと、urlの中に文字が入るparamsとして送ろうとしてエらる
      contentType: false,//content-typeヘッダの値を、fomdataオブジェクトは自動で適切に変換してくれるから、こkではfalseにする。
      dataType: 'json'
    }).done(
    function(data){
      $("#new_message").get(0).reset();
      add_message_component(data);
      scroll();
    }).fail(function(data){
      $('#js-flash').fadeIn().delay(3000).fadeOut(500);
      console.log("失敗");
    });
  }

  scroll();

  $("#message_image").on('change', function(){
    postMessage();
  })

  $('#js-submit').click(function(e){
    e.preventDefault();
    var input = $("#js-input").val();

    if(input === ''){
      console.log("空です。本文を入力してください。");
    } else {
      console.log("送信");
      postMessage();
      $("#js-input").val('');
    }

  });

})


