function fetchImages(img, number) {
    return fetch(`https://pixabay.com/api/?key=25365543-10c6f0b59c93e8af6e85743b2&q=${img}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${number}`)
}
        
export default { fetchImages }