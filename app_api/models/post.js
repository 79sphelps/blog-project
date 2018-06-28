'use strict';

const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 8
    },
    description: {
        type: String,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    }
}, { collection : 'post' });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;