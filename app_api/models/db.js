const mongoose = require('mongoose');
const gracefulShutdown;
const dbURI = 'mongodb://localhost/blogDbPract';


mongoose.connect(dbURI);
/*
mongoose.connect('dbURI', {})
.then(()=> { console.log('Succesfully Connected to theMongodb Database  at URL : ', dbURI)})
.catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : ', dbURI)})
*/


mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});