$(document).on('turbolinks:load', function(){

  user_ids = [];

  $('#js-group-submit').click(function(e){
    e.preventDefault();
    var group_name = $("#group_name").val();
    postUser(group_name);
  });

  function postUser(group_name){
    $.ajax({
      url: "/groups",
      method: "POST",
      data: {
        group: {
          user_ids: user_ids,
          name: group_name
        }
      }
    }).done(
    function(data){
      console.log("成功");
      // location.href = "/";
      //dataTypeでsuccess,errorを判断している。
      //ちなみに、doneとfailの新しい書き方だと、statusコードで判断してくれる。
    }).fail(
    function(data){
      console.log("失敗");
    })
  }

  function incremental(){
    $("#group_user_name").on('keyup', function(){
      var input = $.trim($(this).val());
      var preFunc = null;
      var preInput = '';
      if(preInput !== input){
        clearTimeout(preFunc);
        preFunc = setTimeout(getUser(input), 1000);
      }
      preInput = input;
    })
  }

  function getUser(input){
    console.log(input);
    console.log("getUser呼ばれた");
    $.ajax({
      url: "/users.json",
      method: "GET",
      dataType: "json",
      data: {user_name: input}
    }).done(
    function(data){
      searchUser(data);
      get_user_id();
    }).fail(
    function(data){
      console.log("失敗");
    })
  }

  function searchUser(users){
    $("#user-search-result").empty();
    console.log("searchUser呼ばれた");
    $.each(users, function(i, user){
      add_search_user_component(user);
    })
  }

  function add_search_user_component(user){
    var search_user_component = 
    '<div class="chat-group-user clearfix">'                +
    '<p class="chat-group-user__name">'                     +
    user.name                                               +
    '</p>'                                                  +
    '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="'            +
    user.id                                                 +
    '" data-user-name="'                                    +
    user.name                                               +
    '">追加</a>'                                            +
    '</div>'
    $("#user-search-result").append(search_user_component);
  }

  function get_user_id(){
    $(".user-search-add").click(function(e){
      e.preventDefault();
      var id = $(this).data("user-id");
      var name = $(this).data("user-name");
      user_ids.push(id);
      add_user_component(id, name);
    })
  }

  function add_user_component(id, name){
    var user_component = 
    '<div class="chat-group-user clearfix">'                +
    '<input name="chat-group[user_ids][]" type="hidden"'    +
    'value='                                                +
    id                                                      +
    '>'                                                     +
    '<p class="chat-group-user__name">'                     +
    name                                                    +
    '</p></div>'
    $("#chat-group-users").append(user_component);
  }

  incremental();
})
