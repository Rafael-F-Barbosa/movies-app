const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class User {
	constructor(name, email, password, watchedMovies, wishMovies) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.watchedMovies = watchedMovies;
		this.wishMovies = wishMovies;
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
	saveToWatchList(m, idi) {
		this.watchedMovies.push(m);
		console.log(this.watchedMovies, 'id:', idi);
		const db = getDb();
		return db
			.collection('users')
			.updateOne({ _id: new mongodb.ObjectId(idi) }, { $set: this })
			.then((result) => {
				console.log('movie added to wl');
				// console.log(result);
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
