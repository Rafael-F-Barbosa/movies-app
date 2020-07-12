const Movie = require('../models/movie');

exports.getAddMovies = (req, res, next)=>{
    console.log(Movie.fetchAll())
    res.render('add-movie', {pageTitle: 'Add movies', movies: Movie.fetchAll()});
}

exports.postAddMovies = (req, res, next)=>{
    const movieTitle = req.body.title;
    const movieDirector = req.body.director;
    const movieYear = req.body.year;
    const movieCreated = new Movie(movieTitle, movieDirector, movieYear)
    movieCreated.save();
    res.redirect('/');
}
