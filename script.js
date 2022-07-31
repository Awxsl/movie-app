const api = 'https://api.themoviedb.org/3';
const apiKey = '&api_key=044f3a6d75a29e688f5f6eb1b46796db';
const posterPath = 'https://image.tmdb.org/t/p/original/';
const mostPopular = '/discover/movie?sort_by=popularity.desc';
const xhr = new XMLHttpRequest();
let movieInfo = [];

xhr.open('GET', api+mostPopular+apiKey, true);

xhr.onload = function() {
    if(this.status === 200) {
        const data = JSON.parse(this.responseText).results;
        data.forEach(function(movie, index) {
            movieInfo[index] = {
                "movieName" : movie.original_title, 
                "rating" : movie.vote_average,
                "poster" : movie.poster_path
            }
        });
        // console.log(data);
        console.log(movieInfo);
        movieInfo.forEach(function(movie) {
           makeMovieCard(movie);
        });
    }
    else{
        console.log('Oh Shit');
    }
}


xhr.send();


function makeMovieCard(movieDetails) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.innerHTML = `
    <div class="movie-poster"></div>
    <div class="movie-info">
        <h3 class="movie-name">${movieDetails.movieName}</h4>
        <h4 class="movie-rating">${movieDetails.rating}</h4>
    </div>
    `;
    // console.log(card.children[0].children[1]);
    if(movieDetails.rating>7.5) {
        card.children[1].children[1].style.color = 'Green';
    } else {
        card.children[1].children[1].style.color = 'Red';
    }
    card.children[0].style.backgroundImage = `url(${posterPath+movieDetails.poster})`;
    // console.log(card);
    document.querySelector('main').appendChild(card);
}

// console.log(document.querySelector('main'));