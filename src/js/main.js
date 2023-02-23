'use strict';

// global variables
const cocktailList = document.querySelector('.js-cocktails');
const favouritesList = document.querySelector('.js-favourites');
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const urlMargaritas = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let margaritasList = [];
let allCocktailsList = [];

//charge list of Margaritas when loading the page

fetch(urlMargaritas)
  .then(response => response.json())
  .then(data => {
    margaritasList = data.drinks.map((drink) => ({
      name: drink.strDrink,
      photo: drink.strDrinkThumb
    }));
    renderCoctails(margaritasList);
  });

//function to paint list of cocktails

function renderCoctails(array) {
  for (const eachObj of array) {
    if (eachObj) {
      cocktailList.innerHTML += `<li><h4>${eachObj.name}</h4> <img src="${eachObj.photo}" title="${eachObj.name}" alt="${eachObj.name}" class="imgCocktail"/></li>`;
    } else {
      cocktailList.innerHTML += `<li><h4>${eachObj.name}</h4> <img src="
      ./assets/images/cocktails.png" title="${eachObj.name}" alt="${eachObj.name}" class="imgCocktail"/></li>`;
    }
  }
}

// handle function for search button

function handleClick(ev) {
  ev.preventDefault();
  const inputValue = inputElement.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
      allCocktailsList = data.drinks.map((drink) => ({
        name: drink.strDrink,
        photo: drink.strDrinkThumb
      }));
      cocktailList.innerHTML = '';
      renderCoctails(allCocktailsList);
    });
}

//event for search button

searchBtn.addEventListener('click', handleClick);