// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for post entity
const postSchema = new mongoose.Schema({
  post_title: { type: String, required: true },
  post_body: { type: String, required: true },
  post_time: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
});

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on Post model
//CREATE a post
//I want to update user_id to post_author
async function createPost(title, body, userID) {
  const newPost = await Post.create({
    post_title: title,
    post_body: body,
    user_id: userID,
  });
  return newPost;
}

// READ all post from a user
async function viewPosts(userID) {
  const posts = await getPostByUserId(userID);
  if (!posts) throw Error("no post found");
  return posts;
}
// READ a post by id
async function viewPost(id) {
  const post = await getPost(id);
  if (!post) throw Error("no post found");
  return post;
}

// UPDATE with findByIdAndUpdate()
async function updatePost(id, title, body) {
  const post = await Post.findByIdAndUpdate(
    { _id: id },
    { post_title: title, post_body: body },
    { returnDocument: "after" }
  );
  return post;
}

//DELETE
async function deletePost(id) {
  await Post.deleteOne({ _id: id });
}

// utility function get all posts by user id
async function getPostByUserId(userID) {
  console.log();
  return await Post.find({ user_id: userID });
}
// utility function get post by id
async function getPost(id) {
  console.log();
  return await Post.find({ _id: id });
}

// 5. export all functions we want to access in route files
module.exports = {
  createPost,
  viewPosts,
  updatePost,
  deletePost,
};
