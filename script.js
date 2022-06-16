var cardList = document.getElementById('outside')
var slideCard = document.getElementById('slide-card')
var movieFavorite = document.getElementById('outsideFavor')

function hideAll() {
    cardList.style.display = 'none'
    slideCard.style.display = 'none'
    movieFavorite.style.display = 'none'
}

function addMovieToRow(movies) {
    const cardList = document.getElementById('cardList')
    let div = document.createElement('div')
    let img = document.createElement('img')
    div.classList.add('card')
    div.classList.add('mx-3')
    div.classList.add('my-3')
    div.style.width = '18rem'
    img.setAttribute('src', `${movies.images.jpg.image_url}`)
    img.setAttribute('id', 'imgSet')
    img.classList.add('img-fluid')
    img.classList.add('my-4')
    img.classList.add('mx-2')
    img.classList.add('rounded-4')
    img.classList.add('shadow')
    img.setAttribute('data-bs-toggle', 'modal')
    img.setAttribute('data-bs-target', '#exampleModal')
    img.style.height = '20rem'
    img.addEventListener('click', function() {
        showDetailsMovie(movies)
    })
    div.appendChild(img)

    let divChild = document.createElement('div')
    div.appendChild(divChild)
    divChild.classList.add('card-body')
    divChild.classList.add('d-flex')
    divChild.classList.add('align-content-between')
    divChild.classList.add('row')

    let h5 = document.createElement('h5')
    h5.innerText = `${movies.title}`
    h5.setAttribute('data-bs-toggle', 'modal')
    h5.setAttribute('data-bs-target', '#exampleModal')
    h5.addEventListener('click', function() {
        showDetailsMovie(movies)
    })
    divChild.appendChild(h5)

    let divHeart = document.createElement('div')
    divHeart.setAttribute('id', 'likeIcon')
    divHeart.classList.add('d-flex')
    divHeart.classList.add('justify-content-end')
    divChild.appendChild(divHeart)

    let i = document.createElement('i')
    i.classList.add('bi')
    i.classList.add('bi-heart')
    i.setAttribute('id', 'heart')
    i.classList.add('fs-3')
    i.addEventListener('dblclick', function() {
        let conf = confirm(`Add ${movies.title} to favorite?`)
        if (conf) {
            if (i.classList.contains('toggleOn')) {
                i.classList.replace('toggleOn', 'toggleOff')
            } else if (i.classList.contains('toggleOff')) {
                i.classList.replace('toggleOff', 'toggleOn')
            } else(
                i.classList.add('toggleOn')
            )
            onAddMovieClickToFavorite(movies)
        }
    })
    divHeart.appendChild(i)
    cardList.appendChild(div)

}

window.addEventListener('load', onLoad)

function showDetailsMovie(movie) {
    console.log('wow', movie)
    let imgMovie = document.getElementById('imgMovie')
    imgMovie.setAttribute('src', movie.images.jpg.image_url)
    imgMovie.classList.add('shadow')
    let nameMovie = document.getElementById('nameMovie')
    nameMovie.innerHTML = movie.title
    let typeMovie = document.getElementById('typeMovie')
    typeMovie.innerHTML = `<b>Type : </b>  ${movie.type}`
    let episodesMovie = document.getElementById('epMovie')
    let ratedMovie = document.getElementById('ratedMovie')
    ratedMovie.innerHTML = `<b>Rated :</b> ${movie.rating}`
    episodesMovie.innerHTML = `<b>Episodes :</b> ${movie.episodes}`
    let scoreMovie = document.getElementById('scoreMovie')
    scoreMovie.innerHTML = `<b>Score :</b>  ${movie.score}`
    let synopsisMovie = document.getElementById('synopsisMovie')
    synopsisMovie.innerHTML = `<b>SynopsisMovie :</b >  ${movie.synopsis}`
}

function showDetailsMovieFavor(movie) {
    console.log('wow', movie)
    let imgMovie = document.getElementById('imgMovie')
    imgMovie.setAttribute('src', movie.image_url)
    imgMovie.classList.add('shadow')
    let nameMovie = document.getElementById('nameMovie')
    nameMovie.innerHTML = movie.title
    let typeMovie = document.getElementById('typeMovie')
    typeMovie.innerHTML = `<b>Type : </b>  ${movie.type}`
    let episodesMovie = document.getElementById('epMovie')
    let ratedMovie = document.getElementById('ratedMovie')
    ratedMovie.innerHTML = `<b>Rated :</b> ${movie.rated}`
    episodesMovie.innerHTML = `<b>Episodes :</b> ${movie.episodes}`
    let scoreMovie = document.getElementById('scoreMovie')
    scoreMovie.innerHTML = `<b>Score :</b>  ${movie.score}`
    let synopsisMovie = document.getElementById('synopsisMovie')
    synopsisMovie.innerHTML = `<b>SynopsisMovie :</b >  ${movie.synopsis}`
}


function addMovie() {
    fetch('https://api.jikan.moe/v4/top/anime')
        .then(response => {
            return response.json()
        }).then(data => {
            console.log('success', data)
            listMovie(data.data)
        })
}

function getMovieFavorite() {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/642110326')
        .then(response => {
            return response.json()
        }).then(data => {
            console.log('db', data)
            listMovieFavorite(data)
        })
}

function onAddMovieClickToFavorite(movies) {
    let movie = {}
    movie.id = '642110326'
    movie.movie = {
        'url': movies.url,
        'image_url': movies.images.jpg.image_url,
        'title': movies.title,
        'synopsis': movies.synopsis,
        'type': movies.type,
        'episodes': movies.episodes,
        'score': movies.score,
        'rated': movies.rating
    }
    addMovieToDB(movie)
}

function addMovieToDB(movies) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movies)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
    })
}

function listMovie(mL) {
    const cardList = document.getElementById('cardList')
    cardList.innerHTML = ''
    for (movies of mL) {
        addMovieToRow(movies)
    }
}

function listMovieFavorite(listMovieFavorite) {
    const movieFavorite = document.getElementById('movie-favorite')
    movieFavorite.innerHTML = ''
    for (movies of listMovieFavorite) {
        addMovieToFavorite(movies)
    }
}

function listMovieSlide(listMovieSlide) {
    const slide = document.getElementById('slide')
    slide.innerHTML = ''
    for (movies of listMovieSlide) {
        addMovieToSlide(movies)
    }
}

document.getElementById('menu-home').addEventListener('click', (event) => {
    hideAll()
    cardList.style.display = 'block'
    slideCard.style.display = 'block'
    addMovie()
})

document.getElementById('menu-favorite').addEventListener('click', (event) => {
    showMovieFavorite()
})

function showMovieFavorite() {
    hideAll()
    movieFavorite.style.display = 'block'
    getMovieFavorite()
}

function onLoad() {
    hideAll()
    cardList.style.display = 'block'
    slideCard.style.display = 'block'
    addMovie()
}

function addMovieToFavorite(movie) {
    const movieFavor = document.getElementById('movie-favorite')
    let div = document.createElement('div')
    div.classList.add('card')
    div.classList.add('mx-3')
    div.classList.add('my-3')
    div.style.width = '18rem'

    let img = document.createElement('img')
    img.setAttribute('src', movie.image_url)
    img.setAttribute('id', 'imgSet')
    img.classList.add('img-fluid')
    img.classList.add('my-4')
    img.classList.add('mx-2')
    img.classList.add('rounded-4')
    img.classList.add('shadow')
    img.style.height = '20rem'
    div.appendChild(img)

    let divChild = document.createElement('div')
    div.appendChild(divChild)
    divChild.classList.add('card-body')
    divChild.classList.add('d-flex')
    divChild.classList.add('align-content-between')
    divChild.classList.add('row')

    let h5 = document.createElement('h5')
    h5.innerText = movie.title
    divChild.appendChild(h5)

    let divBtn = document.createElement('div')
    divBtn.classList.add('d-flex')
    divBtn.classList.add('justify-content-center')

    let button = document.createElement('button')
    button.classList.add('rounded-3')
    button.classList.add('border-0')
        // button.classList.add('text-light')
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-bs-target', '#exampleModal')
    button.setAttribute('id', 'btnDetail')
    button.classList.add('shadow')
    button.classList.add('mx-1')
    button.classList.add('px-4')
    button.innerText = 'Detail...'
    button.addEventListener('click', function() {
        showDetailsMovieFavor(movie)
    })
    divBtn.appendChild(button)

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('rounded-3')
    deleteBtn.classList.add('border-0')
    deleteBtn.classList.add('shadow')
    deleteBtn.classList.add('mx-1')
    deleteBtn.classList.add('px-4')
    deleteBtn.classList.add('text-light')
    deleteBtn.setAttribute('id', 'btnDelete')
    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', function() {
        let conf = confirm(`You want to remove ${movie.title} from list`)
        if (conf) {
            deleteMovie(movie.id)
        }
    })
    divBtn.appendChild(deleteBtn)
    divChild.appendChild(divBtn)
    movieFavor.appendChild(div)
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let search = document.getElementById('search').value
    console.log(search)
    fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`)
        .then(response => {
            return response.json()
        }).then(data => {
            console.log(data)
            hideAll()
            cardList.style.display = "block"
            listMovie(data.data)
        })
})

function deleteMovie(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110326&&movieId=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`${data.title} is not now delete`)
        showMovieFavorite()
    }).catch(error => {
        alert('Your movie is not in the database')
    })
}

document.getElementById('KimiNoNaWa').addEventListener('click', () => {
    searchNameMovie('kimi no na wa')
})

document.getElementById('KimiNoNaWa').addEventListener('click', () => {
    searchNameMovie('kimi no na wa')
})

document.getElementById('SpiritedAway').addEventListener('click', () => {
    searchNameMovie('sen to Chihiro')
})

function searchNameMovie(nameMovie) {
    fetch(`https://api.jikan.moe/v4/anime?q=${nameMovie}`)
        .then(response => {
            return response.json()
        }).then(data => {
            console.log('yoo hoo', data.data[0])
            showDetailsMovie(data.data[0])
        })
}