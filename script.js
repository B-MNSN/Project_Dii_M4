var cardList = document.getElementById('outside')
var slideCard = document.getElementById('slide-card')
var movieFavorite = document.getElementById('movie-favorite')

function hideAll() {
    cardList.style.display = 'none'
    slideCard.style.display = 'none'
    movieFavorite.style.display = 'none'
}

function addMovieToRow(movies, movieDB) {
    const cardList = document.getElementById('cardList')
    let div = document.createElement('div')
    let img = document.createElement('img')
    div.classList.add('card')
    div.classList.add('mx-3')
    div.classList.add('my-3')
        // div.style.height = '22rem'
    div.style.width = '18rem'
    img.setAttribute('src', `${movies.images.jpg.image_url}`)
    img.classList.add('img-fluid')
    img.classList.add('my-4')
    img.classList.add('mx-2')
    img.classList.add('rounded-4')
    img.style.height = '20rem'
    div.appendChild(img)

    let divChild = document.createElement('div')
    div.appendChild(divChild)
    divChild.classList.add('card-body')
    divChild.classList.add('d-flex')
    divChild.classList.add('align-content-between')
    divChild.classList.add('row')

    let h5 = document.createElement('h5')
    h5.innerText = `${movies.title}`
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
        let conf = confirm(`ต้องการเพิ่ม ${movies.title} ?`)
        if (conf) {
            console.log('api', movies)
            console.log('DB', movieDB)
                // if (i.classList.contains('toggleOn')) {
                //     i.classList.replace('toggleOn', 'toggleOff')
                // } else if (i.classList.contains('toggleOff')) {
                //     i.classList.replace('toggleOff', 'toggleOn')
                // } else(
                //         i.classList.add('toggleOn')
                //     )
                // toggle(movies, movieDB)
            onAddMovieClickToFavorite(movies)
        }
    })
    divHeart.appendChild(i)
    cardList.appendChild(div)

}
window.addEventListener('load', onLoad)

function toggle(movies, movieDB) {
    // console.log('api', movies.title);
    // console.log('DB', movieDB);
    let heart = document.getElementById('heart')
        // if (checkDB === checkApi) {
        //     heart.classList.add('toggleOn')
        // }
        // if (heart.classList.contains('toggleOn')) {
        //     heart.classList.replace('toggleOn', 'toggleOff')
        // } else if (heart.classList.contains('toggleOff')) {
        //     heart.classList.replace('toggleOff', 'toggleOn')
        // } else(
        //     heart.classList.add('toggleOn')
        // )
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
        'rated': movies.rated,
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

document.getElementById('menu-home').addEventListener('click', (event) => {
    hideAll()
    cardList.style.display = 'block'
    slideCard.style.display = 'block'
    addMovie()
})

document.getElementById('menu-favorite').addEventListener('click', (event) => {
    hideAll()
    movieFavorite.style.display = 'block'
    getMovieFavorite()
})

function onLoad() {
    hideAll()
    cardList.style.display = 'block'
    slideCard.style.display = 'block'
    addMovie()
}

function addMovieToFavorite(movie) {
    const movieFavor = document.getElementById('movie-favorite')
    let div1 = document.createElement('div')
    div1.classList.add('my-5')
    div1.classList.add('mx-2')
    div1.style.maxWidth = '540px'
    div1.classList.add('card')

    let div2 = document.createElement('div')
    div2.classList.add('row')
    div1.appendChild(div2)

    let div3 = document.createElement('div')
    div3.classList.add('col-md-4')
    div3.classList.add('my-3')
    div2.appendChild(div3)

    let img = document.createElement('img')
    img.setAttribute('src', movie.image_url)
    img.classList.add('img-fluid')
    img.classList.add('rounded-4')
    div3.appendChild(img)

    let div4 = document.createElement('div')
    div4.classList.add('col-md-8')
    div2.appendChild(div4)

    let div5 = document.createElement('div')
    div5.classList.add('card-body')
    div4.appendChild(div5)

    let h5 = document.createElement('h5')
    h5.innerText = movie.title
    div5.appendChild(h5)

    let p = document.createElement('p')
        // p.innerText = movie.synopsis
    div5.appendChild(p)

    let div6 = document.createElement('div')
    div6.classList.add('float-end')
    div6.classList.add('mb-2')
    div5.appendChild(div6)

    let i = document.createElement('i')
    i.classList.add('bi')
    i.classList.add('bi-heart')
    i.classList.add('me-3')
    i.classList.add('fs-3')
    i.setAttribute('id', 'heart')
    div6.appendChild(i)

    let button = document.createElement('button')
    button.classList.add('rounded-3')
    button.classList.add('border-0')
    button.innerText = 'Detail...'
    div6.appendChild(button)

    movieFavor.appendChild(div1)
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