const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class Movie {
	constructor(title, year, directorName, directorId, movieUrl) {
		this.title = title;
		this.year = year;
		this.directorName = directorName;
		this.directorId = directorId;
		this.movieUrl = movieUrl;
	}
	save() {
		const db = getDb();
		return db
			.collection('movies')
			.insertOne(this)
			.then((result) => {
				console.log(this);
				return result;
			})
			.catch((err) => console.log(err));
	}
	static fetchAll(itemsPerPage, page) {
		const db = getDb();
		return db
			.collection('movies')
			.find()
			.skip((page - 1) * itemsPerPage)
			.limit(itemsPerPage)
			.toArray()
			.then((movies) => {
				return movies;
			})
			.catch((err) => console.log(err));
	}
	static findById(movieId) {
		const db = getDb();
		return db
			.collection('movies')
			.find({ _id: new mongodb.ObjectId(movieId) })
			.next()
			.then((movie) => {
				console.log('Movie Found');
				return movie;
			})
			.catch((err) => console.log(err));
	}
	static countMovies = () => {
		const db = getDb();
		return db
			.collection('movies')
			.countDocuments()
			.then((result) => {
				return result;
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
