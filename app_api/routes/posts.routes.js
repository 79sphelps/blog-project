'use strict';

const express = require('express');
const router = express.Router();

const ctrlPosts = require('../controllers/posts.controller');

router.get('/posts', ctrlPosts.getPosts);
router.get('/posts/:id', ctrlPosts.getPost);
router.post('/posts', ctrlPosts.createPost);
router.put('/posts/:id', ctrlPosts.updatePost);
router.delete('/posts/:id', ctrlPosts.deletePost);

module.exports = router;