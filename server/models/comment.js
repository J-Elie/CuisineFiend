// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for post entity
const commentSchema = new mongoose.Schema({
  comment_authorID: { type: String, required: true },
  Comment_postID: { type: String, required: true },
  comment_body: { type: String, required: true },
  comment_rating: { type: String },
  comment_time: { type: Date, default: Date.now },
});

// 3. create model of schema
const Comment = mongoose.model("Comment", commentSchema);

// 4. create CRUD functions on Comment model
//CREATE a comment
async function createComment(authorID, postID, body, rating) {
  if (body == "") throw Error("you must enter a body for your comment");
  const newComment = await Comment.create({
    comment_authorID: authorID,
    Comment_postID: postID,
    comment_body: body,
    comment_rating: rating,
  });
  return newComment;
}

// READ all comments on a post
async function viewComments(postID) {
  const comments = await getCommentsByPostId(postID);
  if (!comments) throw Error("no comments found");
  return comments;
}

// READ a comment by id
async function viewComment(id) {
  const comment = await getCommentByID(id);
  if (!comment) throw Error("no comment found");
  return comment;
}

// UPDATE with findByIdAndUpdate()
async function updateComment(id, rating, body) {
  if (body == "") throw Error("you must enter a body to update comment");
  if (rating == "") throw Error("you must enter a rating to update comment");
  const comment = await Comment.findByIdAndUpdate(
    { _id: id },
    { comment_rating: rating, comment_body: body },
    { returnDocument: "after" }
  );
  return comment;
}

//DELETE
async function deleteComment(id) {
  await Comment.deleteOne({ _id: id });
}

// utility function get all comments by post id
async function getCommentsByPostId(postID) {
  return await Comment.find({ Comment_postID: postID });
}
// utility function get comment by id
async function getCommentByID(id) {
  return await Comment.findOne({ _id: id });
}


// 5. export all functions we want to access in route files
module.exports = {
    createComment,
    viewComments,
    viewComment,
    updateComment,
    deleteComment,
};
