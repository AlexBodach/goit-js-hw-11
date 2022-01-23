
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallerry: document.querySelector('.gallery'),
    btnLoading: document.querySelector('.load-more'),

}

let gallery = new SimpleLightbox('.gallery a');
let pageNumber = 1;
let totalPage = 0;
let renderImagesFromApi = '';
let inputValue = null;

refs.btnLoading.style.display = "none";

refs.form.addEventListener('submit', onButtonSerachImages);
refs.btnLoading.addEventListener('click', onBtnLoadingClick);

//gallery.on('show.simplelightbox', function (e) {});

function onButtonSerachImages (e) {
    e.preventDefault();
    inputValue = refs.input.value
    clearDisplayFromLastFetch()
    

    API.fetchImages(inputValue, pageNumber)
    .then(responce => responce.json())
    .then(images => renderCardWithPhotos(images))


 return inputValue
}


function renderCardWithPhotos(images) {
    totalPage = Math.ceil(images.totalHits/40);   
    if (totalPage > 1) {
        refs.btnLoading.style.display = "block";
    }
    
    if(images.totalHits >= 1 && pageNumber === 1) {
        Notify.success(`"Hooray! We found ${images.totalHits} images." `);
    } else  if(images.totalHits === 0){
        refs.btnLoading.style.display = "none";
        Notify.failure('Sorry, there are no images matching your search query. Please try again');
        return
    }

    
    images.hits.map((image) => {     
        const imageSearchCard = `<div class="photo-card">
        <a class="gallery__item" href='${image.largeImageURL}'>
        <img src="${image.webformatURL}" alt="" loading="lazy" class="image-card" />
        <div class="info">
          <p class="info-item">
            <b class="info-text">Likes</b>
            <br>${image.likes}</br>            
          </p>
          <p class="info-item">
            <b>Views</b>
            <br>${image.views}</br>            
          </p>
          <p class="info-item">
            <b>Comments</b>
            <br>${image.comments}</br>
            
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <br>${image.downloads}</br>
            
          </p>
        </div>
      </div>`;

      renderImagesFromApi += imageSearchCard;

    refs.gallerry.innerHTML =  renderImagesFromApi;
    gallery.refresh();

    })
       
}


function onBtnLoadingClick() {
    if(pageNumber >= totalPage ) {       
        Notify.info("We're sorry, but you've reached the end of search results");
      
    }
    pageNumber += 1;
     API.fetchImages(inputValue, pageNumber)
    .then(responce => responce.json())
    .then(images => renderCardWithPhotos(images))


}



function clearDisplayFromLastFetch () {

    pageNumber = 1;
    renderImagesFromApi = '';   
    refs.gallerry.innerHTML = ''; 
    }

refs.gallerry.addEventListener('click', function () {
    console.log('hi');
   
})


