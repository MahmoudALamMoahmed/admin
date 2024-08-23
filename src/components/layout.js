import { Link, useNavigate } from "react-router-dom";

export function NavBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Perform the logout
    localStorage.removeItem('userRole'); // Clear user role from localStorage
    navigate("/LoginAdmin"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-dark"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userRole === 'admin' ? 'Admin' : 'User'}
                </Link>
                <ul className="dropdown-menu">
                  {userRole === 'admin' ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/Admin/Products">
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Profile">
                          Profile
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/Profile">
                        Profile
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogoutAndRedirect}  // Call the logout function and redirect
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
