import { Outlet, Link } from "react-router-dom";
import { useContext, Fragment } from "react";
import UserContext from "../../context/userContext";
import plainLogo from "../../images/plainLogo.png";
const Navbar = () => {
  const { user } = useContext(UserContext);

  const authenticated = (
    <Fragment>
      <h4>Hello {user.username}</h4>
    </Fragment>
  );

  const guest = (
    <Fragment>
      <h4>Welcome</h4>
    </Fragment>
  );

  const authenticatedNav = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link navLink" to="/profile">
          <h6>Profile</h6>
        </Link>
      </li>
    </Fragment>
  );

  const guestNav = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link navLink" to="/login">
          <h6>Login</h6>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link navLink" to="/register">
          <h6>Register</h6>
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <div className="navLogoContainer d-flex flex-row ">
            <Link className="navbar-brand" to="/">
              <img
                src={plainLogo}
                class="navLogo rounded img-responsive d-inline-flex"
                alt="Cuisine Fiend logo"
              ></img>{" "}
              <div className="d-inline-flex ">
                <h4>Cuisine Fiend</h4>
              </div>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link navLink" to="/">
                  <h6>Home</h6>
                </Link>
              </li>
              {user.authenticated ? authenticatedNav : guestNav}
            </ul>
          </div>
          {user.authenticated ? authenticated : guest}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
