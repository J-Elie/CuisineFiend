import logo from "../images/logo.png";
const RegisterForm = () => {
  return (
    <div className=" container d-flex flex-row justify-content-center w-50 
    ">
      <div className=" formComponent pt-3 pb-3 w-50 ">

        <div className="d-flex flex-column justify-content-center w-100">
          <img
            src={logo}
            class="rounded float-start img-responsive logo mx-auto d-block"
            alt="Cuisine Fiend logo"
          ></img>
          <h2 className="text-center mb-3 mt-3">Create your account</h2>
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
          {/* email */}
          <div class="form-floating mb-3 mt-3 ">
            <input
              type="text"
              class="form-control rounded-pill"
              id="email"
              placeholder="Enter your email"
              name="email"
            />
            <label class="form-check-label" for="email">
              Email*
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
          {/* confirm password */}
          <div class="form-floating mb-3 mt-3 ">
            <input
              type="text"
              class="form-control rounded-pill"
              id="confirmPassword"
              placeholder="please confirm your password"
              name="password"
            />
            <label class="form-check-label" for="confirmPassword">
              Confirm Password*
            </label>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <button type="submit" class="btn mb-3 btn-color">
              Register
            </button>
          </div>
          <div className="swapForm d-flex flex-row justify-content-center">
            <p>
              Already have an account?{" "}
              <a href="#" class="swapLink">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
