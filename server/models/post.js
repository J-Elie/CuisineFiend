// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for post entity
const postSchema = new mongoose.Schema({
  post_title: { type: String, required: true },
  post_body: { type: String, required: true },
  post_time: { type: Date, default: Date.now },
  post_authorID: { type: String, required: true },
});

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on Post model
//CREATE a post
async function createPost(title, body, authorID) {
  if (title == "") throw Error("you must enter a title for your post");
  if (body == "") throw Error("you must enter a body for your post");
  //const User = await getUserByID(authorID);//this is also not working
  //if(!User) throw Error("User not found");//this is also not working
  const newPost = await Post.create({
    post_title: title,
    post_body: body,
    post_authorID: authorID,
  });
  return newPost;
}

// READ all post from a user
async function viewPosts(authorID) {
  const posts = await getPostsByUserId(authorID);
  if (!posts) throw Error("no post found");
  return posts;
}
// READ a post by id
async function viewPost(id) {
  const post = await getPostByID(id);
  if (!post) throw Error("no post found");
  return post;
}

// UPDATE with findByIdAndUpdate()
async function updatePost(id, title, body) {
  if (title == "") throw Error("you must enter a title for your post");
  if (body == "") throw Error("you must enter a body for your post");
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
async function getPostsByUserId(authorID) {
  return await Post.find({ post_authorID: authorID });
}
// utility function get post by id
async function getPostByID(id) {
  return await Post.findOne({ _id: id });
}


// 5. export all functions we want to access in route files
module.exports = {
  createPost,
  viewPosts,
  updatePost,
  deletePost,
  viewPost,
};
