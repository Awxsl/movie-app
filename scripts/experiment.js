const api = 'https://api.themoviedb.org/3';
const apiKey = '?api_key=044f3a6d75a29e688f5f6eb1b46796db';
const posterPath = 'https://image.tmdb.org/t/p/original/';
const mostPopular = '/movie/top_rated';
const search_details = '&language=en-US';
const specifyPage = '&page='
const xhr = new XMLHttpRequest();
const main = document.querySelector('main');
let movieInfo = [];

document.addEventListener('DOMContentLoaded', getMovies(5));
main.addEventListener('mouseover', e => cardHover(e));
main.addEventListener('mouseout', e => cardReset(e));

setTimeout(function(){
   movieInfo.forEach(movie => makeMovieCard(movie));
}, 1000);


function getPage(pageNumber) {
    fetch(api+mostPopular+apiKey+search_details+specifyPage+pageNumber)
    .then(response => {
        return response.json();
    }).then(data => {
        for(var i in data.results)
            movieInfo.push(data.results[i])
    });
}


function getMovies(numberOfPages) {
    for(var i=1; i<numberOfPages+1; i++) {
        getPage(i);
    }
}

function makeMovieCard(movie) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.id = movie.id;
    card.innerHTML = `
    <div class="movie-poster"></div>
    <p class="movie-overview"></p> 
    <div class="movie-info">
        <h3 class="movie-name">${movie.title}</h4>
        <h4 class="movie-rating">${movie.vote_average}</h4>
    </div>`;

    if(movie.vote_average>7.5) {
        card.children[2].children[1].style.color = 'Green';
    } else {
                card.children[2].children[1].style.color = 'Red';
            }
            card.children[0].style.backgroundImage = `url(${posterPath+movie.poster_path})`;
            document.querySelector('main').appendChild(card);
}

function cardHover(e) {
    if(e.target.classList.contains('movie-poster') || e.target.classList.contains('movie-overview')) {
        const overview = e.target.parentElement.children[1];
        if(e.target.classList.contains('movie-poster')) {
                    e.target.classList.add('blur');
                }
        // console.log(e.target.parentElement.id);
        overview.textContent = getMovieOverview(e.target.parentElement.id);
            }
}

function getMovieOverview(id) {
    for(var i=0; i<100; i++) {
        if(id == movieInfo[i].id) {
            return movieInfo[i].overview;
        }
    }
}


function cardReset(e) {
    if(e.target.classList.contains('movie-poster')) {
        const overview = e.target.parentElement.children[1];
        e.target.classList.remove('blur');
        overview.textContent = '';
    }
}