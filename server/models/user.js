// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for user entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  user_email: { type: String, unique: true, required: true },
  user_password: { type: String, required: true },
  user_followers: [String],
  user_following: [String],
});

// 3. create model of schema
const User = mongoose.model("User", userSchema);

// 4. create CRUD functions on user model
//CREATE a user
async function register(username, email, password) {
  const UserName = await getUser(username);
  if (UserName) throw Error("Username already in use");
  const UserEmail = await getUserByEmail(email);
  if (UserEmail) throw Error("Email already in use");

  const newUser = await User.create({
    username: username,
    user_email: email,
    user_password: password,
  });

  return newUser;
}

// READ a user
async function login(username, password) {
  const user = await getUser(username);
  if (!user) throw Error("User not found");
  if (user.user_password != password) throw Error("Wrong Password");

  return user;
}

// // UPDATE
// async function updatePassword(id, password) {
//   const user = await User.updateOne({"_id": id}, {$set: { user_password: password}});
//   return user;
// }

// UPDATE with findByIdAndUpdate()
async function updatePassword(id, password) {
  const userError = await getUserByID(id);
  if (!userError) throw Error("User not found");//this line is not working?
  if (userError.user_password == password) throw Error("Password must be new");

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { user_password: password },
    { returnDocument: "after" }
  );
  return user;
}

//DELETE
async function deleteUser(id) {
  const user = await getUserByID(id);
  if (!user) throw Error("User not found");//this line is not working?
  await User.deleteOne({ _id: id });
}

// utility function get user by username
async function getUser(username) {
  return await User.findOne({ username: username });
}
// utility function get user by email
async function getUserByEmail(user_email) {
  return await User.findOne({ user_email: user_email });
}

// utility function get user by id
async function getUserByID(id) {
  return await User.findOne({ _id: id });
}

// 5. export all functions we want to access in route files
module.exports = {
  register,
  login,
  updatePassword,
  deleteUser,
};
