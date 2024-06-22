import logo from "../images/logo.png";
const LoginForm = () => {
  return (
    <div className=" formContainer container d-flex flex-row justify-content-center w-50">
    <div className=" formComponent pt-3 pb-3 w-50 ">

      <div className="d-flex flex-row justify-content-center w-100">
        <img
          src={logo}
          class="rounded float-start img-responsive logo pe-1"
          alt="Cuisine Fiend logo"
        ></img>
        <h2 className="text-center ps-4 d-flex flex-column justify-content-center">Sign in</h2>
      </div>

      <form className=" ps-5 pe-5 w-100 min-w-min ">
        {/* username */}
        <div class="form-floating mb-3 mt-3 min-w-min">
          <input
            type="text"
            class="form-control rounded-pill"
            id="username"
            placeholder="Enter a username"
            name="username"
          />
          <label class="form-check-label" for="username">
            Username*
          </label>
        </div>
        {/* password */}
        <div class="form-floating mb-3 mt-3 ">
          <input
            type="text"
            class="form-control rounded-pill"
            id="password"
            placeholder="Enter your password"
            name="password"
          />
          <label class="form-check-label" for="password">
            Password*
          </label>
        </div>

        <div class="form-check mb-3 d-flex flex-row justify-content-center">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember" />{" "}
            Remember Me
          </label>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" class="btn mb-3 btn-color">
            Login
          </button>
        </div>
        <div className="swapForm d-flex flex-row justify-content-center">
          <p>
            Don't have an account?{" "}
            <a href="#" class="swapLink">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
  );
};

export default LoginForm;
