var app = angular.module("youtubeApp", []),
    key = "AIzaSyBLRbr01sfJxpsheftChVI4TeRC2zDbtD4";

app.controller("loadData", function($scope, $http) {
  var temp = this;
  //getChannel initiated when the user submits
  //a channel string in the form
  $scope.getChannel = function() {
    console.log($scope.channelString);
    //call fetch1, passing the channel string
    $scope.fetch1($scope.channelString);
    $scope.channelString = "";
  }
  $scope.fetch1 = function(channel) {
    //ajax request to YouTube API loading
    //initial channel data
    $http({
      url: "https://www.googleapis.com/youtube/v3/channels",
      method: "get",
      params: { "part" : "contentDetails", "forUsername" : channel, "key" : key }
    })
    .success(function(data, status, headers, config) {
      //console.log(data.items);
      //console.log(status);
      
      //assigns a reusable variable the value
      //of the playlist id for the channel queried
      $scope.contentId = data.items[0].contentDetails.relatedPlaylists.uploads;
      //then calls fetch2
      $scope.fetch2();
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
    });
  };//end $scope.fetch1
  $scope.fetch2 = function(pageToken) {
    //fetch2 can be called wit ha variable passed
    //or nothing passed.
    //if a variable is passed it will be the page
    //token which would determine the data displayed
    pageToken = pageToken || "";
    //ajax request to load channel playlist data
    $http({
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      method: "get",
      params: { "part" : "snippet", "playlistId" : $scope.contentId, "maxResults" : 20, "pageToken" : pageToken, "key" : key }
    })
    .success(function(data, status, headers, config) {
      //console.log(data.items);
      //console.log(status);
      
      //assigns current next or previous page
      //takes, to be used for page navigation.
      //will be empty string if ther are not next
      //or previous page tokens
      $scope.prev = data.prevPageToken || "";
      $scope.next = data.nextPageToken || "";
      //puts the data in scope for easier access
      $scope.items = data.items;
      //console.log($scope.prev);
      //console.log($scope.next);
      //console.log(app)
    })
    .error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
    });
  };//end $scope.fetch2
  //next and previous page navigation functions
  $(document).on("click", "#prev", function() {
    console.log("prev clicked");
    if($scope.prev) {
      console.log("success");
      $scope.fetch2($scope.prev);
    }
  });
  $(document).on("click", "#next", function() {
    console.log("next clicked");
    if($scope.next) {
      console.log("success");
      $scope.fetch2($scope.next);
    }
  });
});
//a tag click event to embed hte video on the same
//page
$(document).on("click", "#items-list a", function() {
  $("body").prepend(  "<div class='backdrop'></div>"+
                      "<div class='embed'>"+
                      "<iframe width=100% height=100% src='https://youtube.com/embed/" + $(this).data('id') + "' frameborder='0' allowfullscreen></iframe>"+
                    "</div>"+
                    "<div class='close'>&#x2716;</div>");
  return false;
});
//click event on the close button to close the
//embedded video, backdro and close button
$(document).on("click", ".close", function() {
  $(".embed, .backdrop, .close").remove();  
});
