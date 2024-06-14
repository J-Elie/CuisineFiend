// 1. import any needed libraries
const express = require("express");
const Comment = require('../models/comment'); //accesses functions in comment model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/createComment', async (req, res) => {
    try {
      const comment = await Comment.createComment(req.body.comment_authorID, req.body.Comment_postID, req.body.comment_body, req.body.comment_rating );
      res.send({...comment.toObject()});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/viewComments', async (req, res) => {
    try {
      const comments = await Comment.viewComments(req.body.Comment_postID);
      res.send({...comments});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/updateComment', async (req, res) => {
    try {
      const comment = await Comment.updateComment(req.body.id, req.body.comment_rating, req.body.comment_body);
      res.send({...comment.toObject()});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/deleteComment', async (req, res) => {
    try {
      await Comment.deleteComment(req.body.id);
      res.send({ success: "Comment deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;
