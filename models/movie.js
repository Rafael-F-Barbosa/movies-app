const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

module.exports = class Movie {
	constructor(title, director, year) {
		this.director = director;
		this.title = title;
		this.year = year;
    }
    save(){
        const db = getDb();
        return db
        .collection('movies')
        .insertOne(this)
        .then(result=>{
            return result;
        })
        .catch(err=>console.log(err));
    }
    static fetchAll(){
        const db = getDb();
        return db
        .collection('movies')
        .find()
        .toArray()
        .then((movies)=>{
            return movies;
        })
        .catch((err)=>console.log(err));
    }
    static findById(movieId){
        const db = getDb();
        return db
        .collection('movies')
        .find({_id: new mongodb.ObjectId(movieId)})
        .next()
        .then(movie=>{
            console.log('Movie Found')
            return movie;
        })
        .catch(err=>console.log(err))
    }
};