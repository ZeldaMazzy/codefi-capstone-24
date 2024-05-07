const mongoose = require('mongoose');

const connectToDB = (url) => {
    const dbConnection = mongoose.connect(url);
    if (dbConnection) {
        console.log('Connected to Database');
    }
    return dbConnection;
};

module.exports = connectToDB;