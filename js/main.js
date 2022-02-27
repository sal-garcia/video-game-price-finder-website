function reqListener() {
  // "this" is the xmlhttps request obj

  var gamesArr = JSON.parse(this.responseText);
  // the stringified raw data will be parsed into js code

  var $homeContainer = document.querySelector('.home-container');
  for (const game of gamesArr) {
    // dom creations for home page
    var $outerGameDiv = document.createElement('div');
    $outerGameDiv.setAttribute('class', 'game-info-rows row justify-content-space-around');
    $homeContainer.appendChild($outerGameDiv);

    var $gameDealImg = document.createElement('img');
    $gameDealImg.setAttribute('class', 'game-deal-image');
    $gameDealImg.setAttribute('src', game.thumb);
    $gameDealImg.setAttribute('alt', 'image');

    $outerGameDiv.appendChild($gameDealImg);

    var $columnDiv = document.createElement('div');
    $columnDiv.setAttribute('class', 'column');

    $outerGameDiv.appendChild($columnDiv);

    var $gameDealBlock = document.createElement('div');
    $gameDealBlock.setAttribute('class', 'game-deal-width');

    $columnDiv.appendChild($gameDealBlock);

    var $gameTitle = document.createElement('h2');
    $gameTitle.setAttribute('class', 'blue-title');
    $gameTitle.textContent = game.title;

    $gameDealBlock.appendChild($gameTitle);

    var $gameSalePrice = document.createElement('h2');
    $gameSalePrice.textContent = game.salePrice;

    $gameDealBlock.appendChild($gameSalePrice);

  }
}
// dom creations for home page

// XMLHTttpResquest
var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=Price');
oReq.send();
// XMLHTttpResquest
