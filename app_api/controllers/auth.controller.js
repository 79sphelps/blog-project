'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    if (!req.body.username || !req.body.password) {
        sendJSONResponse(res, 400, { "message": "All fields required" });
        return;
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({ "token": token });
    });
};

module.exports.login = function(req, res) {
    console.log('auth.controller login...');
    if (!req.body.username || !req.body.password) {
        sendJSONResponse(res, 400, { "message": "All fields required" });
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        var token;

        if (err) return res.status(404).json(err);

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({ "token": token });
        } else {
            res.status(401).json(info);
        }   
    })(req, res);
};