/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//------------- functions -----------------
function createTweetElement(tweetData){
  return $(`<article>
          <header>
            <div>
              <img src=${tweetData.user.avatars.regular}>
              <h2>${tweetData.user.name}</h2>
            </div>
            <p>${tweetData.user.handle}</p>
          </header>
          <div class="tweet-content">
              <p>${escape(tweetData.content.text)}</p>
          </div>
          <footer class="footer">
            <span>
              <p>${tweetData.created_at}</p>
            </span>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </footer>
        </article>`)
}

function renderTweets(data) {
  for(var tweet in data){
    $('#tweets-container').prepend(createTweetElement(data[tweet]));
  }
}

function loadTweets(){
  $.ajax({
    url: 'tweets',
    method: 'GET',
    success: function (tweets) {
      renderTweets(tweets);
    }
  });
}

//-------- stops external javascript
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//-------- jquery handlers -------------
$( document ).ready(function() {

$("#compose").on('click', function(e){
  $(".new-tweet").slideToggle();
  $(".new-tweet textarea").focus();
});

//jquery for compose tweet button
$( ".new-tweet form " ).on('submit',function(e){
  e.preventDefault();

  let tweet = $(this).serialize().substring(6);//cuts the name of the form out of the tweet

  if(tweet === "" || tweet === null){//checks if tweet is empty
    $("#tweet-error").text("Empty tweet");
  } else if(tweet.length > 140) {//checks if tweet is too long
    $("#tweet-error").text("Your tweet is too long");
  } else {
    $.ajax({
      url: 'tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function (data) {
        $("#tweets-container").empty();
        loadTweets();// reloads the tweets after adding a tweet to the database
      }
    });
    //clears the textarea and resets the character counter after posting a tweet
    $(this).find("textarea").val("");
    $(this).find("span").html("140");
    $("#tweet-error").text("");
  }
});

//on page load take all the tweets and render them
loadTweets();

});
