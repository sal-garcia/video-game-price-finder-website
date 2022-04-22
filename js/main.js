var storesNames = [];
function reqListener() {
  // "this" is the xmlhttps request obj

  var gamesArr = JSON.parse(this.responseText);
  // the stringified raw data will be parsed into js code

  var $homeContainer = document.querySelector('.home-container');
  for (const game of gamesArr) {
    // dom creations for content in home page
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

// XMLHTttpResquest
var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://www.cheapshark.com/api/1.0/deals?pageSize=5&sortBy=Price');
oReq.send();
// XMLHTttpResquest

// search bar functionality
var $Search = document.getElementById('search');
function searchbtn(e) {
  var $inputBar = document.querySelector('.input-bar');
  var $gameSearchSection = document.querySelector('.game-search');
  $gameSearchSection.innerHTML = ''; // everytime new search is made dom html is cleared so that results wont stack on top of each other
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${$inputBar.value}`)// fetches whatever text in in the inputbar
    .then(function (response) {
      return response.json(); // first .then makes the response body accesible
    })
    .then(function (gamesInBody) { // second .then moves data in the body

      var gameIds = [];
      for (var i = 0; i < gamesInBody.length; i++) {
        gameIds.push(gamesInBody[i].gameID);// pushes game id's into array
      }
      var gameIdString = gameIds.join(',');// joins those ids sepereated by a comma
      return fetch(`https://www.cheapshark.com/api/1.0/games?ids=${gameIdString}`);// looks up a list of games by id's
    })
    .then(function (response) { // first .then makes the body accesable
      return response.json();
      // console.log(response);
    })
    .then(function (listOfgameIds) { // second then accesses the body
      var $gameSearchSection = document.querySelector('.game-search');
      for (var game in listOfgameIds) {
        const sortedDeals = [...listOfgameIds[game].deals];// spread operator(makes copy)
        sortedDeals.sort((firstDeal, secondDeal) => {

          return parseFloat(firstDeal.price) - parseFloat(secondDeal.price);
        });

        var $rowsOfGames = document.createElement('div');// dom creation on the games that have been searched
        $rowsOfGames.setAttribute('class', 'rows-of-games column-gap justify-content-center');

        for (let i = 0; i < sortedDeals.length; i++) { // goes thru all the deals and dom creates for it

          var $divContainer = document.createElement('div');
          var $imgDeal = document.createElement('img');
          var $h2DealsName = document.createElement('h2');
          $h2DealsName.setAttribute('class', 'deal-name-color');

          var $h2DealsPrice = document.createElement('h2');
          $h2DealsPrice.setAttribute('class', 'deal-name-color');
          $imgDeal.src = listOfgameIds[game].info.thumb;
          $imgDeal.setAttribute('class', 'img-width');
          $divContainer.appendChild($imgDeal);

          $h2DealsName.textContent = storesNames.find(storesName => { // finds store name
            return storesName.storeID === sortedDeals[i].storeID;
          }).storeName;
          $h2DealsPrice.textContent = sortedDeals[i].price;
          $divContainer.appendChild($h2DealsName);
          $divContainer.appendChild($h2DealsPrice);
          $rowsOfGames.appendChild($divContainer);

          if ((i + 1) % 3 === 0) { // makes sure theres only 3 elements per row

            $gameSearchSection.appendChild($rowsOfGames);
            $rowsOfGames = document.createElement('div');
            $rowsOfGames.setAttribute('class', 'rows-of-games column-gap justify-content-center');
          }
        }
        if (sortedDeals.length % 3 !== 0) {
          $gameSearchSection.appendChild($rowsOfGames);
        }
      }
    });
  var $searchSectionContainer = document.querySelector('.search-section-container');
  $searchSectionContainer.classList.remove('display-none');
  var $homeContainer = document.querySelector('.home-container');
  $homeContainer.classList.add('display-none');
}
$Search.addEventListener('click', searchbtn);
// fetches info for the stores info link

// issue 5 user can view information on he stores that are being compared

fetch('https://www.cheapshark.com/api/1.0/stores')
  .then(function (response) {

    return response.json(); // first .then makes the body accesable
  })
  .then(function (response) {
    storesNames = response;
  });
// issue 5 user can view information on he stores that are being compared
const $homeContainer = document.querySelector('.home-container');
const $searchSectionContainer = document.querySelector('.search-section-container');
const $storeInfoContainer = document.querySelector('.store-info-container');
window.onload = function () { // on load for dom
  const $homeLink = document.querySelector('.home-link');
  $homeLink.addEventListener('click', function (event) {
    event.preventDefault();
    $storeInfoContainer.classList.add('display-none');
    $searchSectionContainer.classList.add('display-none');
    $homeContainer.classList.remove('display-none');
  });
  const $storeInfoLink = document.querySelector('.store-info-link');
  $storeInfoLink.addEventListener('click', function (event) {
    event.preventDefault();
    $storeInfoContainer.classList.remove('display-none');
    $searchSectionContainer.classList.add('display-none');
    $homeContainer.classList.add('display-none');

    let storesNamesForStoreInfo = [];
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then(function (response) {

        return response.json(); // first .then makes the body accesable
      })
      .then(function (response) {
        storesNamesForStoreInfo = response;
        const storesInfoPageTitle = document.createElement('h1');
        storesInfoPageTitle.innerText = 'Stores Information';
        $storeInfoContainer.appendChild(storesInfoPageTitle);
        $storeInfoContainer.classList.add('stores-page-title');
        let divRowStoresInfo = document.createElement('div');
        divRowStoresInfo.classList.add('store-info-row');
        divRowStoresInfo.classList.add('justify-content-space-around');

        for (let i = 0; i < storesNamesForStoreInfo.length; i++) {

          const divStackForStoreInfo = document.createElement('div');
          const storeInfoImg = document.createElement('img');
          storeInfoImg.setAttribute('src', 'https://www.cheapshark.com' + storesNamesForStoreInfo[i].images.logo);

          divStackForStoreInfo.appendChild(storeInfoImg);
          const storeInfoTitle = document.createElement('h2');
          storeInfoTitle.classList.add('stores-titles');
          storeInfoTitle.innerText = storesNamesForStoreInfo[i].storeName;
          divStackForStoreInfo.appendChild(storeInfoTitle);

          divRowStoresInfo.appendChild(divStackForStoreInfo);
          if ((i + 1) % 3 === 0) {

            $storeInfoContainer.appendChild(divRowStoresInfo);

            divRowStoresInfo = document.createElement('div');
            divRowStoresInfo.classList.add('store-info-row');
            divRowStoresInfo.classList.add('justify-content-space-around');

          }

        }

      });

  });
};
// issue 5 user can view information on he stores that are being compared

// user can get alerts when a game drops in price
// user can get alerts when a game drops in price
