var API_URL = "http://deckofcardsapi.com/api";
var JSONP_PROXY = 'https://jsonp.afeld.me/?url=';
var deckID = "";
var dCards = [];
var dTotal = 0;
var pCards = [];
var pTotal = 0;
var cheatCodes = 0;



$('.newGameButton').on("click", function() {
  getJSON(JSONP_PROXY + API_URL + '/shuffle/?deck_count=6', function (d) {
    $.get(JSONP_PROXY + API_URL + "/draw/" + d.deck_id + "/?count=10", function(data){
    console.log(data);
    deckID = d.deck_id;
      for (var i=0; i<5; i++){
        if (data.cards[i].value === "ACE") {
          dCards.push(111);
        }else if (data.cards[i].value === "KING"){
          dCards.push("10");
        }else if (data.cards[i].value === "QUEEN"){
          dCards.push("10");
        }else if (data.cards[i].value === "JACK"){
          dCards.push("10");
        }else{
        dCards.push(data.cards[i].value);
        }
      }
      for (var i=5; i<10; i++){
        if (data.cards[i].value === "ACE") {
          pCards.push(111);
        }else if (data.cards[i].value === "KING"){
          pCards.push("10");
        }else if (data.cards[i].value === "QUEEN"){
          pCards.push("10");
        }else if (data.cards[i].value === "JACK"){
          pCards.push("10");
        }else{
        pCards.push(data.cards[i].value);
        }
      }
      pCards = pCards.map(Number);
      dCards = dCards.map(Number);
      var dAce = dCards.indexOf(111);
      for (var i=0; i<5; i++) {
        if (dAce !== -1) {
          dCards[dAce] = [1, 11];
        }
      }
      var pAce = pCards.indexOf(111);
      for (var i=0; i<5; i++) {
        if (pAce !== -1) {
          pCards[pAce] = [1, 11];
        }
      }



    if (cheatCodes === 0){
      cheatCodes++;
      $(".dealercards").append("<img src='" + data.cards[0].image + "' alt=''>", "<img src='http://www.cheatersolitaire.com/Classic/RedBack.gif' alt=''>");
      $(".playercards").append("<img src='" + data.cards[5].image + "' alt=''>", "<img src='" + data.cards[6].image + "' alt=''>");
      $(".test").replaceWith( "<h1>Dealer's Cards:</h1>" );
      $(".magic").replaceWith( "<h1>Your Cards:</h1>" );
      $(".hitBtn").replaceWith( "<input type=button class='hitButton' value='Hit'>" );
      $(".standBtn").replaceWith( "<input type=button class='standButton' value='Stand'>" );
    }else{
      location.reload();
    }
    })
  })
});





function getJSON(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', JSONP_PROXY + url);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.responseText));
    }
  };
  request.send();
}
