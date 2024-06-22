import plainLogo from "../images/plainLogo.png";
const Navbar = () => {
  return (
      <div>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
          <div className="container-fluid">
            <div className="navLogoContainer d-flex flex-row ">
              <a className="navbar-brand" href="#">
                <img
                  src={plainLogo}
                  class="navLogo rounded img-responsive d-inline-flex"
                  alt="Cuisine Fiend logo"
                ></img>{" "}
                <div className="d-inline-flex ">
                <h4>Cuisine Fiend</h4>
                </div>
              </a>
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
                  <a className="nav-link navLink" href="#">
                  <h6>Home</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navLink" href="#">
                   <h6>Profile</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navLink" href="#">
                  <h6>Login</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navLink" href="#">
                  <h6>Register</h6>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
  );
};

export default Navbar;
