const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class Director {
	constructor(name, birthYear, movies) {
		this.name = name;
		this.birthYear = birthYear;
		this.movies = movies;
	}
	save() {
		const db = getDb();
		return db
			.collection('directors')
			.insertOne(this)
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
	}
	addMovie(movie, directorId) {
        const db = getDb();
		this.movies.push(movie);
        return db.collection('directors').updateOne({_id: directorId},{$set: this});
	}
	static fetchAll() {
		const db = getDb();
		return db
			.collection('directors')
			.find()
			.toArray()
			.then((directors) => {
				return directors;
			})
			.catch((err) => console.log(err));
	}
	static findById(directorId) {
		const db = getDb();
		return db
			.collection('directors')
			.find({ _id: new mongodb.ObjectId(directorId) })
			.next()
			.then((director) => {
				return director;
			})
			.catch((err) => console.log(err));
	}
};
