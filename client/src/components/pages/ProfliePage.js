import { fetchData } from "../../main.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Fragment } from "react";

const ProfilePage = (props) => {
  // const navigate = useNavigate();
  const { user } = useContext(UserContext);
  // console.log(user);
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
          console.log("successful post");
          // navigate("/");
          changeState();
        }
      })
      .catch((error) => {
        console.log(`error! ${error.message}`);
      });
  };
  let usersPosts = [];
  const [rerender, setRerender] = useState(0);
  function changeState() {
    setRerender((prevState) => prevState - 1);
  }

  const [items, setItems] = useState([]);
  const [statePost, stateShowPost] = useState("renderPosts");
  useEffect(() => {
    fetchData(
      "/post/viewPosts",
      {
        post_authorID: user._id,
      },
      "POST"
    )
      .then((data) => {
        // console.log("posts rendered");
        if (!data.message) {
          usersPosts = [];
          for (var i in data) {
            usersPosts.push(data[i]);
          }
          // console.log(props.books);
          console.log(usersPosts);
          setItems(usersPosts);
          console.log("posts rendered");
        }
      })
      .catch((error) => {
        console.log("error no post ");
        console.log(`error! ${error.message}`);
      });
  }, [rerender]);

  const onDelete = (id) => {
   fetchData(
      "/post/deletePost",
      {
        id: id,
      },
      "delete"
    )
      .then((data) => {
        if (!data.message) {
          console.log(data);
          console.log(`successful delete of ${id}`);

          // navigate("/");
          changeState();
        }
        // console.log(data);
      })
      .catch((error) => {
        console.log(`error! ${error.message}`);
      });
  };
  console.log();
  return (
    <div>
      <div className=" container d-flex flex-row justify-content-center w-50 ">
        <div className=" formComponent pt-3 pb-3 w-100 postForm">
          <form onSubmit={onSubmit} className=" ps-5 pe-5 w-100 min-w-min ">
            {/* username */}
            <div className="form-floating mb-3 mt-3 min-w-min">
              <input
                type="text"
                className="form-control rounded-pill"
                id="post_title"
                placeholder="Enter a title"
                name="post_title"
                onChange={onChange}
                value={post_title}
                required
              />
              <label className="form-check-label" htmlFor="post_title">
                Recipe_title*
              </label>
            </div>
            {/* email */}
            <div className="form-floating mb-3 mt-3 h-100">
              <textarea
                class="form-control"
                id="post_body"
                rows="8"
                name="post_body"
                onChange={onChange}
                value={post_body}
                required
                placeholder="Recipe directions*"
              ></textarea>
              <label className="form-check-label" htmlFor="post_body">
              Recipe directions*
              </label>
            </div>

            <div
              onMouseEnter={changeState}
              className="d-flex flex-row justify-content-center"
            >
              <button
                onClick={changeState}
                type="submit"
                className="btn mb-3 btn-color"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="d-flex flex-column w-100 justify-content-center">
          <h2 className="text-center">{user.username}'s Recipe Cards</h2>
          <div className="cardContainer">
            <ul className="ulPosts d-flex flex-row flex-wrap">
              {items.map((item) => {
                // return <div>{JSON.stringify(item.post_body)}</div>
                return (
                  <li
                    key={item._id}
                    className="liPosts mt-2 mb-2 w-50 ps-2 pe-2"
                  >
                    <div className="">
                      <div className="card">
                        <h5 className="card-header">{item.post_title}</h5>
                        <div className="card-body">
                          <p className="card-text">
                            <pre className="postBody">{item.post_body}</pre>
                          </p>
                          <div className="text-muted">
                            <p>posted on {item.post_time.slice(0, 10)}</p>
                          </div>
                        </div>
                        <div className="card-footer d-flex flex-row justify-content-center">
                          <div className="w-75 d-flex flex-row justify-content-around">
                            <div>
                              <button
                                onClick={() => onDelete(item._id)}
                                type="button"
                                className="btn mb-3 btn-color"
                              >
                                Delete Recipe
                              </button>
                            </div>
                            <div>
                              <button
                                // onClick={onEdit(item._id)}
                                type="button"
                                className="btn mb-3 btn-color"
                                disabled
                              >
                                Edit Recipe
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
