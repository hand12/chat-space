$(document).on('turbolinks:load', function(){
  function add_message_component(message){
    var chat_message =
    '<li class="chat-message">'         +
    '<div class="chat-message__header">' +
    '<p class="chat-message__name">'    +
    message.name                           +
    '</p>'                              +
    '<p class="chat-message__time">'    +
    message.time                 +
    '</p>'                              +
    '</div><br>'                            +
    '<p class="chat-message__body">'    +
    message.body                           +
    '</p>'                              +
    '</li>'
    $(".chat-messages").append(chat_message);
  }

  function scroll(){
    console.log("スクロールされた");
    var target = $('.chat-main');
    target.animate({scrollTop: $('.chat-body').height()}, 500);
  }

  // function getMessage(){
  //   console.log("getMessageよばれた");
  //   $.ajax({
  //     url: "/messages.json",
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(json){
  //       var len = json.length;
  //       for (var i = 0; i < len; i++){
  //         add_message_component(json[i]);
  //       }
  //     },
  //     error: function(){
  //       console.log("通信失敗");
  //     }
  //   })
  // };
  scroll();

  $('#js-submit').click(function(e){
    e.preventDefault();
    var input = $("#js-input").val();
    $("#js-input").val('');

    $.ajax({
      url: '/messages.json',
      type: 'POST',
      data: {
        "message": {"body": input},
      },
      dataType: 'json',
      success: function(json){
        $('#message_body').val('');
        add_message_component(json);
        scroll();
      },
      error: function(){
        $('#js-flash').fadeIn().delay(3000).fadeOut(500);
        console.log("失敗");
      }
    });

  });
})


