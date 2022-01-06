const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());


//Connect to DB
// mongoose.connect('mongodb+srv://user:user@codi-mongo-db.m66wb.mongodb.net/codi-mongo-db?retryWrites=true&w=majority', () => console.log("Connected to DB"))
mongoose
    .connect('mongodb+srv://user:user@codi-mongo-db.m66wb.mongodb.net/codi-mongo-db?retryWrites=true&w=majority')
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

const movieSchema = mongoose.Schema({
    movieItems: [{
        title: String,
        year: Number,
        rating: Number
    }]
})

const moviesDB = mongoose.model('moviesDB', movieSchema)

const Movies = new moviesDB({
    movieItems: [
        { title: "Jaws", year: 1975, rating: 8 },
        { title: "Avatar", year: 2009, rating: 7.8 },
        { title: "Brazil", year: 1985, rating: 8 },
        { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
    ],
})



// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendStatus(200);
    console.log(Movies)
})

//step 2
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
});

//step 3
app.get('/test', (req, res) => {
    res.json({ status: 200, message: "Ok" })
})

app.get('/time', (req, res) => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    res.json({ status: 200, message: `${hours} : ${minutes}` })
})

//step 4
app.get('/hello/:id', (req, res) => {
    res.json({ status: 200, message: req.params.id })
})
app.get('/hello', (req, res) => {
    res.json({ status: 200, message: "hello" })
})
app.get('/search', (req, res) => {
    console.log(req.query.s);
    req.query.s ? res.json({ status: 200, message: "Ok", data: req.query.s }) : res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
})

//step 5
const movies =
    [
        { title: 'Jaws', year: 1975, rating: 8 },
        { title: 'Avatar', year: 2009, rating: 7.8 },
        { title: 'Brazil', year: 1985, rating: 8 },
        { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
    ]



app.get('/movies/read', (req, res) => {
    console.log(req.params)
    moviesDB.find().then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json({ message: err })
    });
    // res.json({ status: "200", message: Movies })
})

//step 6
app.get('/movies/read/by-date', (req, res) => {
    res.json({ status: 200, message: Movies.movieItems.sort((a, b) => b.year - a.year) })
})

app.get('/movies/read/by-rating', (req, res) => {
    res.json({ status: 200, message: Movies.movieItems.sort((a, b) => b.rating - a.rating) })
})

app.get('/movies/read/by-title', (req, res) => {
    res.json({
        status: 200, message: Movies.movieItems.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1
            if ((a.title.toLowerCase() > b.title.toLowerCase()))
                return 1
            return 0
            // a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
        })
    })
})

//step 7
app.get('/movies/read/id/:id', (req, res) => {
    let id = req.params.id

    moviesDB.findById(id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(404).json({ message: err })
    });
    // if (id < movies.length) {
    //     res.json({ status: 200, data: movies[id] })
    // }
    // else {
    //     res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` })
    // }

})

//step 8
app.post('/movies/create', (req, res) => {
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
        // res.json({ status: 200, data: movies });
        console.log(req.body);
        // const Movies = new moviesDB({
        //     "title": req.body.title,
        //     "year": req.body.year,
        //     "rating": req.body.rating
        // });
        Movies.movieItems.push(req.body)
        Movies.save().then(data => {
            res.json(data)
        }).catch(err => {
            res.json({ message: err })
        });
    }
})

//step 9
app.delete('/movies/delete/:id', (req, res) => {
    let id = req.params.id;
    moviesDB.remove({ _id: id }).then(data => {
        res.json(data)
    }).catch(err => {
        res.json({ message: err })
    });

    // if (movies.length - 1 < req.params.id) {
    //     res.status(404).json({ status: 404, error: true, message: 'the movie <ID> does not exist' })
    // }
    // else {
    //     movies.splice(req.params.id, 1)
    //     res.json({ status: 200, data: movies })
    // }
})

//step 10
app.patch('/movies/update/:id', (req, res) => {
    // if (req.params.id > 0 && req.params.id < movies.length) {
    //     if (req.query.title) movies[req.params.id].title = req.query.title;
    //     if (req.query.year) movies[req.params.id].year = req.query.year;
    //     if (req.query.rating) movies[req.params.id].rating = req.query.rating;
    //     res.status(200).json({ status: 200, data: movies });
    // }
    // else {
    //     res.status(404).json({ status: 404, error: true, message: 'the movie <ID> does not exist' })
    // }
    let id = req.params.id;

    if (req.query.title) {

        moviesDB.updateOne({ _id: id }, { $set: { title: req.query.title } }).then(data => {
            res.json(data)
        }).catch(err => {
            res.json({ message: err })
        });
    }

    if (req.query.year) {
        moviesDB.updateOne({ _id: id }, { $set: { year: req.query.year } }).then(data => {
            res.json(data)
        }).catch(err => {
            res.json({ message: err })
        });
    }

    if (req.query.rating) {
        moviesDB.updateOne({ _id: id }, { $set: { rating: req.query.rating } }).then(data => {
            res.json(data)
        }).catch(err => {
            res.json({ message: err })
        });
    }
})


app.post('/post', (req, res) => {
    console.log(req.body)
})

