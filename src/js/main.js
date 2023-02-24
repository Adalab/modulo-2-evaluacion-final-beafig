'use strict';

// global variables

const cocktailList = document.querySelector('.js-cocktails');
const favouritesList = document.querySelector('.js-favourites');
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const urlMargaritas = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let margaritas = [];
let allCocktails = [];
let favMargarita = [];
let favCocktails = [];

//charge list of Margaritas when loading the page

fetch(urlMargaritas)
  .then(response => response.json())
  .then(data => {
    margaritas = data.drinks.map((drink) => ({
      name: drink.strDrink,
      photo: drink.strDrinkThumb,
      id: drink.idDrink
    }));
    renderCocktails(margaritas);
    addEvent();
    // searchFav();
  });

// search favourites in LocalStorage

// const localFav = JSON.parse(localStorage.getItem('cocktails'));
// function searchFav() {
//   if (localFav) {
//     renderFavourites(localFav);
//   }
// }

//function to paint list of cocktails

function renderCocktails(array) {
  for (const eachObj of array) {
    if (eachObj.photo) {
      cocktailList.innerHTML += `<li class="js-liElement" id="${eachObj.id}"><h4>${eachObj.name}</h4> <img src="${eachObj.photo}" title="${eachObj.name}" alt="${eachObj.name}" class="imgCocktail"/></li>`;
    } else {
      cocktailList.innerHTML += `<li class="js-liElement" id="${eachObj.id}"><h4>${eachObj.name}</h4> <img src="
      ./assets/images/cocktails.png" title="${eachObj.name}" alt="${eachObj.name}" class="imgCocktail"/></li>`;
    }
  }
}

// handle function for search button

function handleClickBtn(ev) {
  ev.preventDefault();
  const inputValue = inputElement.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      allCocktails = data.drinks.map((drink) => ({
        name: drink.strDrink,
        photo: drink.strDrinkThumb,
        id: drink.idDrink
      }));
      cocktailList.innerHTML = '';
      renderCocktails(allCocktails);
      addEvent();
    });
}

// handle function to add to favourites list

function handleClickList(ev) {
  const selectedMargaritas = margaritas.find(drink => drink.id === ev.currentTarget.id);
  const indexMarg = favMargarita.findIndex(drink => drink.id === ev.currentTarget.id);
  if (indexMarg === -1) {
    ev.currentTarget.classList.add('selected');
    favMargarita.push(selectedMargaritas);
    renderFavourites(favMargarita);
    localStorage.setItem('cocktails', JSON.stringify(favMargarita));
  } else {
    ev.currentTarget.classList.remove('selected');
    favMargarita.splice(indexMarg, 1);
    renderFavourites(favMargarita);
  }
  //   const selectedCocktails = allCocktails.find(drink => drink.id === ev.currentTarget.id);
  //   const indexCocktail = favCocktails.findIndex(drink => drink.id === ev.currentTarget.id);
  //   if (indexCocktail === -1) {
  //ev.currentTarget.classList.add('selected');
  //     favCocktails.push(selectedCocktails);
  //     renderFavourites(favCocktails);
  //     localStorage.setItem('cocktails', JSON.stringify(favCocktails));
  //   } else {
  //     ev.currentTarget.classList.remove('selected');
  //     favCocktails.splice(indexCocktail, 1);
  //     renderFavourites(favCocktails);
  //   }
  addCloseBtn();
}

// function to paint list of favourites

function renderFavourites(array) {
  favouritesList.innerHTML = '';
  for (const eachObj of array) {
    favouritesList.innerHTML += `<li class="js-liElement"> <h4>${eachObj.name}<i class="fa-solid fa-xmark js-closeIcon" id="${eachObj.id}"></i></h4> <img src="${eachObj.photo}" title="${eachObj.name}" alt="${eachObj.name}" class="imgCocktail"/> </li>`;
  }
}

// handle function to reset favourites list

function handleClickReset(ev) {
  ev.preventDefault();
  console.log();
  favouritesList.innerHTML = '';
  localStorage.removeItem('cocktails');
}

// handle function to delete each favoutire

function handleClickClose(ev) {
  console.log(ev.currentTarget.id);
  const indexClose = favMargarita.findIndex(close => close.id === ev.currentTarget.id);
  console.log(indexClose);
  if (indexClose !== -1) {
    favMargarita.splice(indexClose, 1);
    renderFavourites(favMargarita);
  }
}

//EVENTS

//listener in search button
searchBtn.addEventListener('click', handleClickBtn);

//listener in cocktail's list
function addEvent() {
  const liElements = document.querySelectorAll('.js-liElement');
  for (const eachLi of liElements) {
    eachLi.addEventListener('click', handleClickList);
  }
}

//listener in reset button
resetBtn.addEventListener('click', handleClickReset);

//listener in x icons to delete favs
function addCloseBtn() {
  const closeIcons = document.querySelectorAll('.js-closeIcon');
  for (const eachX of closeIcons) {
    eachX.addEventListener('click', handleClickClose);
  }
}