$(document).on('turbolinks:load', function(){
  var messageNum = 0;
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
    scroll();
  }

  function scroll(){
    console.log("スクロールされた");
    var target = $('.chat-main');
    target.animate({scrollTop: $('.chat-body').height()}, 500);
  }

  function postMessage(){
    var fd = new FormData($("#new_message").get(0));
    var input = $("#js-input").val();
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
    }).fail(function(data){
      $('#js-flash').fadeIn().delay(3000).fadeOut(500);
      console.log("失敗");
    });
  }

  function getMessage(messageNum){
    console.log("getMessageよばれた");

    $.ajax({
      url: "/messages.json",
      type: 'GET',
      dataType: 'json'
    }).done(
    function(data){
      len = data.length;
      if (len == messageNum){
        console.log("変化なし");
      } else {
        for (var i = messageNum; i < len; i++){
          add_message_component(data[i]);
        }
        messageNum = len;
        return messageNum;
      }
    }).fail(
    function(date){
      console.log("通信失敗");
    })

  }

  function autoReload(){
    console.log("autoReload呼ばれた");
    getMessage(messageNum);
    // setInterval(getMessage(messageNum), 1000);
  }

  messageNum = getMessage(messageNum);
  scroll();
  setInterval(autoReload, 1000 * 10);


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


