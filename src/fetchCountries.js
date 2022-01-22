function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}`)
}
        
export default { fetchCountries }