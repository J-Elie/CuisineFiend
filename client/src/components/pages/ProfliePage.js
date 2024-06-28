import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Fragment } from "react";
const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user);
  // console.log(user._id);
  const [post, setPost] = useState({
    post_title: "",
    post_body: "",
    post_time: "",
    post_authorID: user._id,
  });

  const { post_title, post_body, post_time, post_authorID } = post;

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData(
      "/post/createPost",
      {
        post_title,
        post_body,
        post_time,
        post_authorID,
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          // console.log(data);
          // navigate("/");
        }
      })
      .catch((error) => {
        console.log(`error! ${error.message}`);
      });
  };

  //need to make data accessible outside of function
  let usersPosts = [];


  const showPosts = (e) => {
    e.preventDefault();
    fetchData(
      "/post/viewPosts",
      {
        post_authorID,
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          console.log("all your posts");
          console.log(data);
          // navigate("/");
          // usersPosts = [...data] ;
          console.log("all your posts");
          console.log(usersPosts);
          console.log(usersPosts.typeof);
          console.log("type of ");
          // postFragment = (
          // <Fragment>
          //   <div>
          //     <ul>
          //       {usersPosts.map((single) => (
          //         <li key={post._id}>{single.post_title}</li>
          //       ))}
          //     </ul>
          //     <h1>im done</h1>
          //   </div>
          // </Fragment>
          //)
        }
      })
      .catch((error) => {
        console.log("error no post ");
        console.log(`error! ${error.message}`);
      });
  };

  console.log();
  return (
    <div className=" container d-flex flex-row justify-content-center w-50 ">
      <div className=" formComponent pt-3 pb-3 w-50 ">
        <form onSubmit={onSubmit} className=" ps-5 pe-5 w-100 min-w-min ">
          {/* username */}
          <div className="form-floating mb-3 mt-3 min-w-min">
            <input
              type="text"
              className="form-control rounded-pill"
              id="post_title"
              placeholder="Enter a post_title"
              name="post_title"
              onChange={onChange}
              value={post_title}
              required
            />
            <label className="form-check-label" htmlFor="post_title">
              post_title*
            </label>
          </div>
          {/* email */}
          <div className="form-floating mb-3 mt-3 ">
            <input
              type="text"
              className="form-control rounded-pill"
              id="post_body"
              placeholder="Enter your post_body"
              name="post_body"
              onChange={onChange}
              value={post_body}
              required
            />
            <label className="form-check-label" htmlFor="post_body">
              post_body*
            </label>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <button type="submit" className="btn mb-3 btn-color">
              Submit
            </button>
          </div>
        </form>

        <div>
          <h2 onClick={showPosts}>your posts</h2>
        </div>
      </div>
      <div>
          <h1>hi</h1>
      </div>
    </div>
  );
};
export default ProfilePage;
