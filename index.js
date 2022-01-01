const express = require('express');
const app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/hello/:id', (req, res) => {
    res.json({ status: 200, message: req.params.id })
})
app.get('/hello', (req, res) => {
    res.json({ status: 200, message: "hello" })
})

app.get('/test', (req, res) => {
    res.json({ status: 200, message: "Ok" })
})

app.get('/time', (req, res) => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    res.json({ status: 200, message: `${hours} : ${minutes}` })
})

app.get('/search', (req, res) => {
    console.log(req.query.s);
    req.query.s ? res.json({ status: 200, message: "Ok", data: req.query.s }) : res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
})

app.get('/movies/create', (req, res) => {
    if (!req.query.rating) {
        req.query.rating = 4;
    }
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;

    if (!title || !year || year.length != 4 || isNaN(year)) {
        res.json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
    }

    else {
        year = parseInt(year);
        rating = parseInt(rating);
        movies.push({ title, year, rating });
        res.json({ status: 200, data: movies });
    }
})

app.get('/movies/read', (req, res) => {
    res.json({ status: "200", message: movies })
})
app.get('/movies/update', (req, res) => {

})
app.get('/movies/delete/:id', (req, res) => {

    if (movies.length < req.params.id) {
        res.json({ status: 404, error: true, message: 'the movie <ID> does not exist' })
    }
    else {
        movies.splice(req.params.id, 1)
        res.json({ status: 200, data: movies })
    }
})

app.get('/movies/read/by-date', (req, res) => {
    res.json({ status: 200, message: movies.sort((a, b) => b.year - a.year) })
})

app.get('/movies/read/by-rating', (req, res) => {
    res.json({ status: 200, message: movies.sort((a, b) => b.rating - a.rating) })
})

app.get('/movies/read/by-title', (req, res) => {
    res.json({
        status: 200, message: movies.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1
            if ((a.title.toLowerCase() > b.title.toLowerCase()))
                return 1
            return 0
            // a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
        })
    })
})

app.get('/movies/read/id/:id', (req, res) => {
    let id = req.params.id
    if (id) {
        if (id < movies.length) {
            res.json({ status: 200, data: movies[id] })
        }
        else {
            res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` })
        }
    }
})



app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
});