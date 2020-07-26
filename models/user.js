const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const Movie = require('../models/movie');

module.exports = class User {
	constructor(name, email, password, watchedMovies, wishMovies, token, tokenExpiration) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.watchedMovies = watchedMovies;
		this.wishMovies = wishMovies;
		this.token = token || null;
		this.tokenExpiration = tokenExpiration || null;
	}
	save() {
		const db = getDb();
		return db
			.collection('users')
			.insertOne(this)
			.then((result) => {
				console.log(this);
				return result;
			})
			.catch((err) => console.log(err));
	}
	saveToWatchList(movie, userId) {
		const movieIndex = this.watchedMovies.findIndex((element) => element.toString() === movie.toString());
		if (movieIndex === -1) {
			this.watchedMovies.push(movie);
		}
		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: this })
			.then((result) => {
				console.log('movie added to wl');
				return result;
			})
			.catch((err) => console.log(err));
	}
	saveToWishList(movie, userId) {
		const movieIndex = this.wishMovies.findIndex((element) => element.toString() === movie.toString());
		if (movieIndex === -1) {
			this.wishMovies.push(movie);
		}
		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: this })
			.then((result) => {
				console.log('movie added to wish');
				return result;
			})
			.catch((err) => console.log(err));
	}
	getMyMovies(moviesIds) {
		return Promise.all(
			moviesIds.map((elementId) => {
				return new Promise((resolve, reject) => {
					Movie.findById(elementId).then((movie) => resolve(movie)).catch((err) => {
						console.log(err);
					});
				});
			})
		)
			.then((listOfMovies) => {
				console.log(listOfMovies);
				return listOfMovies;
			})
			.catch((err) => {
				console.log(err);
			});
	}
	deleteWatched(movieId, userId) {
		const updatedMovies = this.watchedMovies.filter((movie) => movie.toString() !== movieId.toString());
		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: { watchedMovies: updatedMovies } })
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
	}
	deleteWish(movieId, userId) {
		const updatedMovies = this.wishMovies.filter((movie) => movie.toString() !== movieId.toString());
		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(userId) }, { $set: { wishMovies: updatedMovies } })
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('users')
			.find()
			.toArray()
			.then((movies) => {
				return movies;
			})
			.catch((err) => console.log(err));
	}
	static findById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.find({ _id: new mongodb.ObjectId(userId) })
			.next()
			.then((user) => {
				return user;
			})
			.catch((err) => console.log(err));
	}
	static findByEmail(userEmail) {
		const db = getDb();
		return db
			.collection('users')
			.find({ email: userEmail })
			.next()
			.then((user) => {
				return user;
			})
			.catch((err) => console.log(err));
	}
};
