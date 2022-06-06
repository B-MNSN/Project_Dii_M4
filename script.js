// var movies = {}
// movies.url = 'https://i.pinimg.com/564x/61/f5/cc/61f5ccad28bad6756d7f05daf98a2b1a.jpg'
// movies.name = 'nnn'
// movies.inform = 'mmmmmmmmmmmmm'

function addMovieToRow(movies) {
    const cardList = document.getElementById('cardList')
    let div = document.createElement('div')
    let img = document.createElement('img')
    div.classList.add('card')
    div.classList.add('mx-3')
    div.classList.add('my-3')
    div.style.height = '22rem'
    div.style.width = '15rem'
    img.setAttribute('src', `${movies.image_url}`)
    img.classList.add('img-fluid')
    img.classList.add('my-4')
    img.classList.add('mx-2')
    img.classList.add('rounded-4')
    img.classList.add('h-50')
    div.appendChild(img)
    let divChild = document.createElement('div')
    div.appendChild(divChild)
    divChild.classList.add('card-body')
    let h5 = document.createElement('h5')
    let p = document.createElement('p')
    let i = document.createElement('i')
    h5.innerText = `${movies.title}`
    divChild.appendChild(h5)
        // p.innerText = movies.synopsis
    divChild.appendChild(p)
    i.classList.add('bi')
    i.classList.add('bi-heart')
    i.classList.add('float-end')
    i.setAttribute('id', 'heart')
    i.classList.add('fs-3')
    divChild.appendChild(i)
    cardList.appendChild(div)

}
window.addEventListener('load', function() {
    addMovie()
})

function addMovie(movie) {
    fetch('https://se104-project-backend.du.r.appspot.com/movies/601232100', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
        listMovie(data)
    })
}

// function aM() {
//     fetch('https://se104-project-backend.du.r.appspot.com/movies/601232100')
//         .then(response => response.json())
//         .then(data => addMovieToRow(data))
// }

function listMovie(mL) {
    const cardList = document.getElementById('cardList')
    cardList.innerHTML = ''
    for (movies of mL) {
        addMovieToRow(movies)
    }
}