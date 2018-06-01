const mongoose = require('mongoose');
const Post = require('../models/post');
//mongoose.connect('mongodb://localhost/blogDbPract');

module.exports.getPosts = function(req, res, next) {
    Post.find({}, (err, posts) => {
        return res.status(200).json(posts);
    });
};

module.exports.getPost = function(req, res, next) {
    Post.findOne({_id: req.params.id}, (err, post) => {
        if (err) return res.status(400).json(err)
        else return res.status(201).json(post);
    });
};

module.exports.createPost = function(req, res, next) {
    delete req.body._id;
    Post.create(req.body, (err, post) => {
        if (err) return res.status(400).json(err)
        else return res.status(201).json(post)
    });
};

module.exports.updatePost = function(req, res, next) {
    Post.update({_id: req.params.id}, req.body, (err, status) => {
        if (err) return res.status(400).json(err)
        else return res.status(201).json(true);
    });
};

module.exports.deletePost = function(req, res, next) {
    Post.deleteMany({_id: req.params.id}, (err, status) => {
        if (err) return res.status(400).json(err)
        else return res.status(201).json(true);
    });
};
