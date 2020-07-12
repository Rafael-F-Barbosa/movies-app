const Movie = require('../models/movie');

exports.getIndex = (req, res, next)=>{
    res.render('index', {pageTitle: 'Add movies', movies: Movie.fetchAll()});
}