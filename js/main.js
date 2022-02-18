function reqListener() {
  // "this" is the xmlhttps request obj
  var gamesArr = JSON.parse(this.responseText);
  // the stringified raw data will be parsed into js code
  var $main = document.querySelector('main');
  for (const game of gamesArr) {
    $main.innerHTML += `
          <div class="game-info-rows row justify-content-space-around">
        <img class="game-deal-image" src="${game.thumb}" alt="game">
          <div class="column">
            <div class="game-deal-width">
              <h2 class="blue-title">${game.title}</h2>
              <h2>${game.salePrice}</h2>
            </div>
          </div>
        </div>
`
    ;
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=Price');
oReq.send();
