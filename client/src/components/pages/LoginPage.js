import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import { Outlet, Link } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const { username, user_password, user_email, _id , user_followers, user_following} = user;

  const onChange = (e) => updateUser(e.target.name, e.target.value);
  // const [user, setUser] = useState({
  //   username: "",
  //   user_password: "",
  //   _id: ""
  // });

  // const { username, user_password, _id} = user;

  // const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData(
      "/user/login",
      {
        username,
        user_password,
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          user._id = data._id;
          user.user_followers = data.user_followers;
          user.user_following = data.user_following;
          user.user_email = data.user_email
          updateUser("authenticated", true);
          // console.log(user);
          console.log("successful log in");
          navigate("/profile")
        }
      })
      .catch((error) => {
        console.log(`error! ${error.message}`);
      });
  };

  return (
    <div className=" formContainer container d-flex flex-row justify-content-center w-50">
    <div className=" formComponent pt-3 pb-3 w-50 ">
      <div className="d-flex flex-row justify-content-center w-100">
        <img
          src={logo}
          className="rounded float-start img-responsive logo pe-1"
          alt="Cuisine Fiend logo"
        ></img>
        <h2 className="text-center ps-4 d-flex flex-column justify-content-center">
          Sign in
        </h2>
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

        <div className="form-check mb-3 d-flex flex-row justify-content-center">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" name="remember" />{" "}
            Remember Me
          </label>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" className="btn mb-3 btn-color">
            Login
          </button>
        </div>
        <div className="swapForm d-flex flex-row justify-content-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="swapLink">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
    <Outlet />
  </div>
  );
};

export default LoginPage;
