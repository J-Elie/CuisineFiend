import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import { Outlet, Link } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();

  const { user, updateUser } = useContext(UserContext);

  const { username, user_email, user_password, confirmPassword, _id , user_followers, user_following} = user;

  const onChange = (e) => updateUser(e.target.name, e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData(
      "/user/register",
      {
        username,
        user_email,
        user_password,
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          user._id = data._id;
          user.user_followers = data.user_followers;
          user.user_following = data.user_following;
          // updateUser("_id", data._id);

          // console.log(user._id);
          updateUser("authenticated", true);
          // console.log(data);
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.log(`error! ${error.message}`);
      });

    // if (password !== confirmPassword) {
    //   console.log("error passwords must match");
    // } else {
    //   console.log("success ");
    // }
  };
  return (
    <div className=" container d-flex flex-row justify-content-center w-50 ">
      <div className=" formComponent pt-3 pb-3 w-50 ">
        <div className="d-flex flex-column justify-content-center w-100">
          <img
            src={logo}
            className="rounded float-start img-responsive logo mx-auto d-block"
            alt="Cuisine Fiend logo"
          ></img>
          <h2 className="text-center mb-3 mt-3">Create your account</h2>
        </div>

        <form onSubmit={onSubmit} className=" ps-5 pe-5 w-100 min-w-min ">
          {/* username */}
          <div className="form-floating mb-3 mt-3 min-w-min">
            <input
              type="text"
              className="form-control rounded-pill"
              id="username"
              placeholder="Enter a username"
              name="username"
              onChange={onChange}
              value={username}
              required
            />
            <label className="form-check-label" htmlFor="username">
              Username*
            </label>
          </div>
          {/* email */}
          <div className="form-floating mb-3 mt-3 ">
            <input
              type="text"
              className="form-control rounded-pill"
              id="email"
              placeholder="Enter your email"
              name="user_email"
              onChange={onChange}
              value={user_email}
              required
            />
            <label className="form-check-label" htmlFor="email">
              Email*
            </label>
          </div>
          {/* password */}
          <div className="form-floating mb-3 mt-3 ">
            <input
              type="text"
              className="form-control rounded-pill"
              id="password"
              placeholder="Enter your password"
              name="user_password"
              onChange={onChange}
              value={user_password}
              required
            />
            <label className="form-check-label" htmlFor="password">
              Password*
            </label>
          </div>
          {/* confirm password */}
          <div className="form-floating mb-3 mt-3 ">
            <input
              type="text"
              className="form-control rounded-pill"
              id="confirmPassword"
              placeholder="please confirm your password"
              name="confirmPassword"
              onChange={onChange}
              value={confirmPassword}
              required
            />
            <label className="form-check-label" htmlFor="confirmPassword">
              Confirm Password*
            </label>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <button type="submit" className="btn mb-3 btn-color">
              Register
            </button>
          </div>
          <div className="swapForm d-flex flex-row justify-content-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="swapLink">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Outlet />
    </div>
  );
};

export default RegisterPage;
