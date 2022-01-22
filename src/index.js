
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import debounce from 'lodash.debounce'
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input'),
    card: document.querySelector('.country-info'),
    list: document.querySelector('.country-list')
}

refs.input.addEventListener('input', debounce(inputServerSearch, DEBOUNCE_DELAY))

function inputServerSearch (e) {
    let name = e.target.value.trim();
    if (name.length <= 1) {
        refs.list.innerHTML = "";
        refs.card.innerHTML = "";    
    } else {
    
    API.fetchCountries(name) 
   .then(responce => responce.json())
   .then(countries => countriesMaker (countries))
   .catch(rejectedResult)
    }
}

function countryCardRender (country) {
    country.map((i) => {
        let countryLanuges = [];
        i.languages.map((language) => countryLanuges.push(language.name))
 
       const countryCard = `<div class="country-card">
       <div class="country-name-logo">
       <img src="${i.flag}" alt="" height="25" width="50">
       <h1 class="country-name">${i.name}</h1>
       </div>
       <p>
           Capital: <span>${i.capital}</span>
       </p>
       <p>
           Population: <span>${i.population}</span>
       </p>
       <p>
           Languges: <span>${countryLanuges}</span>
       </p>
        </div>`  
    refs.card.innerHTML = countryCard;
    })    
}

function countryListRender (countries) {
    let countryList = "";
           countries.map((item) => {
               countryList += `<li class="country-item">
               <img src="${item.flag}" alt="" height="25" width="50">
               <p class="contry-name">${item.name}</p>
             </li>`
             return countryList
           })         
           refs.list.innerHTML = countryList;
}

function rejectedResult() { 
    Notify.warning('Oops, there is no country with that name');
}

function countriesMaker (countries) {
    
    if (countries.length === 1) {
        countryCardRender(countries)
        refs.list.innerHTML = "";    
        
       } else if(countries.length <10 && countries.length > 1) {
        refs.card.innerHTML = "";
        countryListRender (countries)
           
       } else if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        }
        if(countries.status === 404) {
            rejectedResult()
        }
  }