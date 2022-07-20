const mongoose = require("mongoose");
const conn_string = "mongodb://localhost:27017/fuel_db"

function connectToDb() {
    return mongoose.connect(conn_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((conn) => {
        return conn;
    }).catch(err => {
        console.log(err);
    });
}

connectToDb();

module.exports = {
    mongoose: mongoose,
    User: require("./db-models/user"),
    Quote: require("./db-models/quote"),
    Profile:require("./db-models/profile"),
    connectToDb: connectToDb,
};