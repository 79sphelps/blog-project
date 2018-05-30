// #1
let mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// #2
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    salt: String
}, { collection : 'user' });

// #3
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// #4
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// #5
UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000)
    }, "MY_SECRET");
}

// #6
let User = mongoose.model("User", UserSchema);
module.exports = User;