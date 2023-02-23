'use strict';

// global variables
const cocktailList = document.querySelector('.js-cocktails');
const favouritesList = document.querySelector('.js-favourites');
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const urlMargaritas = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let margaritasList = [];

//charge list of Margaritas when loading the page

fetch(urlMargaritas)
  .then(response => response.json())
  .then(data => {
    margaritasList = data.drinks.map((drink) => ({
      name: drink.strDrink,
      photo: drink.strDrinkThumb
    }));
    renderMargaritas(margaritasList);
  });

//function to paint list of Margaritas when loading the page

function renderMargaritas(array) {
  for (const eachObj of array) {
    cocktailList.innerHTML += `<li><h4>${eachObj.name}</h4> <img src="${eachObj.photo}" title=${eachObj.name} alt=${eachObj.name} class="imgMargaritas"/></li>`;
  }
}

