const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const mongoURI = "mongodb+srv://Rafael-F-Barbosa:3aWKh7qeDCgu1RK1@cluster0.gtpef.mongodb.net/MyVideos?retryWrites=true&w=majority"

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(mongoURI, {useUnifiedTopology: true})
    .then(client => {
        console.log("Connected to Atlas!")
        _db = client.db();
        callback();
    })
    .catch(err=>{
        console.log(err)
        throw err;   
    });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;