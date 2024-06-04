// 1. import any needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in post model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/createPost', async (req, res) => {
    try {
      const post = await Post.createPost(req.body.post_title, req.body.post_body, req.body.user_id );
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/viewPosts', async (req, res) => {
    try {
      const post = await Post.viewPosts(req.body.user_id);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/updatePost', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.id, req.body.post_title, req.body.post_body);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deletePost', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;

