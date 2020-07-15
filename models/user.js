const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

module.exports = class User {
	constructor(name, email, password) {
		this.name = name;
		this.email = email;
		this.password = password;
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
			.then((movie) => {
				return movie;
			})
			.catch((err) => console.log(err));
	}
};
