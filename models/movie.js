const movies = [];
module.exports = class Movie {
	constructor(title, director, year) {
		this.director = director;
		this.title = title;
		this.year = year;
    }
    save(){
        movies.push(this)
    }
    static fetchAll(){
        return movies;
    }
};