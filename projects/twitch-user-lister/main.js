$(document).ready(function() {
  var streamer = ["piecedigital", "freecodecamp", "riotgames", "asiaamore", "gbay99", "jennythesquirrel", "prestigestudios", "brokengamezhd", "cillaid"];
  streamer.map(function(elem) {
    // console.log(elem);
    $.ajax({
      url: "https://api.twitch.tv/kraken/streams/" + elem,
      dataType: "jsonp",
      success: function(data) {
        //console.log("stream channel: " + data._links.channel);
        var status;
        if(data.stream) {
          status = ["online", "&#x2713;"];
        } else {
          status = ["offline", "&#x2716;"];
        }
        $.ajax({
          url: data._links.channel,
          dataType: "jsonp",
          success: function(secondData) {
            //console.log("stream data: " + secondData.url);
            var url = secondData.url;
            var name = secondData.name;
            var displayName = secondData.display_name;
            var logo = secondData.logo || "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
            var title = secondData.status;
            var game = secondData.game;
            $("#user-list").append("<li class='" + status[0] + "' data-name='" + name + "'>"+
                                      "<a href='" + url + "' target='_blank'>"+
                                        "<img class='image' src='" + logo + "' alt='' />"+
                                        "<span class='name'>" + displayName + "</span>"+
                                        "<span class='title'>" + title + "</span>"+
                                        "<span class='game'>" + game + "</span>"+
                                        "<span class='status " + status[0] + "'>" + status[1] + "</span>"+
                                      "</a>"+
                                    "</li>");
          },
          error: function(secMsg1, secMsg2, secMsg3) {
            console.log(secMsg1.status);
            console.log(secMsg2);
            console.log(secMsg3.message);
          }
        });
      },
      error: function(msg1, msg2, msg3) {
        console.log(msg1.status);
        console.log(msg2);
        console.log(msg3.message);
      }
    });
  });
  // click events
  // tab functionality
  $("#tabs li").on("click", function() {
    $("#tabs li").removeClass("selected");
    $(this).addClass("selected");
    refresh();
  });
  $("#all-tab").on("click", function() {
    $("#user-list li").attr("style", "");
  });
  $("#online-tab").on("click", function() {
    $("#user-list li.online").attr("style", "display: block");
    $("#user-list li.offline").attr("style", "display: none");
  });
  $("#offline-tab").on("click", function() {
    $("#user-list li.online").attr("style", "display: none");
    $("#user-list li.offline").attr("style", "display: block");
  });
  // addNewUser click
  $(document).on("click", "#add", function() {
    addNewUser();
  });
  // search functionality
  var formData = $("#listed-search");
  
  $("#listed-search input").on("keyup", function() {
    arrangeList();
  });
  $("#unlisted-search").on("submit", function() {
    getNewUser();
    return false;
  });
  // arrange list function
  function arrangeList() {
    var FD = formData.serializeArray();
    var inputData = new RegExp(FD[0].value, "gi");
    //console.log(inputData);
    
    $("#user-list li").map(function(ind, elem) {
      // console.log($(elem).attr("class"));
      if( !$(elem).data("name").match(inputData) ) {
        $(elem).attr("style", "display: none;");
      } else {
        $(elem).attr("style", "display: block;");
      }
    });
  }
  // getNewUser function
  function getNewUser() {
    var status2;
    var username = $("#unlisted-search").serializeArray();
    $.ajax({
      url: "https://api.twitch.tv/kraken/streams/" + username[0].value,
      dataType: "jsonp",
      success: function(data) {
        if (data.message) {
          console.log(username[0].value);
          $("#user-list2").html("<li data-name=''>"+
                                        "<a href='' target='_blank'>"+
                                          "<img class='image' src='http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png' alt='' />"+
                                          "<span class='name'>" + username[0].value + "</span>"+
                                          "<span class='title'>" + data.message + "</span>"+
                                          "<span class='game'>null</span>"+
                                          "<span class='status offline'>&#x2716;</span>"+
                                        "</a>"+
                                      "</li>");
        } else {
          if(data.stream) {
            status2 = ["online", "&#x2713;"];
          } else {
            status2 = ["offline", "&#x2716;"];
          }
          $.ajax({
            url: data._links.channel,
            dataType: "jsonp",
            success: function(otherData) {
              //console.log("stream data: " + secondData.url);
              var url2 = otherData.url;
              var name2 = otherData.name;
              var displayName2 = otherData.display_name;
              var logo = otherData.logo || "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
              var title2 = otherData.status;
              var game2 = otherData.game;
              $("#user-list2").html("<li class='" + status2[0] + "' data-name='" + name2 + "'>"+
                                        "<a href='" + url2 + "' target='_blank'>"+
                                          "<img class='image' src='" + logo + "' alt='' />"+
                                          "<span class='name'>" + displayName2 + "</span>"+
                                          "<span class='title'>" + title2 + "</span>"+
                                          "<span class='game'>" + game2 + "</span>"+
                                          "<span class='status " + status2[0] + "'>" + status2[1] + "</span>"+
                                        "</a>"+
                                        "<div id='add'></div>"+
                                      "</li>");
            },
            error: function(secMsg1, secMsg2, secMsg3) {
              console.log(secMsg1.status);
              console.log(secMsg2);
              console.log(secMsg3.message);
            }
          });
        }
      },
      error: function(msg1, msg2, msg3) {
        console.log(msg1.status);
        console.log(msg2);
        console.log(msg3.message);
      }
    });
  }
  // addNewUser function
  function addNewUser () {
    var newUser = $("#user-list2 #add").parent();
    //console.log( newUser );
    $("#user-list").append(newUser);
    streamer.push($(newUser).data("name"));
  }
  function refresh() {
    streamer.map(function(elem) {
      //console.log(elem)
      $.ajax({
        url:  "https://api.twitch.tv/kraken/streams/" + elem,
        dataType: "jsonp",
        success: function(data) {
          var status;
          if(data.stream) {
            status = ["online", "&#x2713;"];
          } else {
            status = ["offline", "&#x2716;"];
          }
          $("#user-list li[data-name='" + elem + "']").attr("class", status[0]);
          $("#user-list li[data-name='" + elem + "']").find(".status").attr("class", "status " + status[0]).html(status[1]);
        }
      });
    });
  }
});