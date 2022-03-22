import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  //To get cart Items from redux store
  const { cartItems } = useSelector((state) => ({
    cartItems: state.cartReducer.cartItems,
  }));

  //To get the current user details from local store to show the current user
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const currentUser =
    loginUser && loginUser.email.substring(0, loginUser.email.length - 10);

  //Logout method to logout from current user session and removing login user details from store
  //also make the currnt sesson reload
  const logout = () => {
    localStorage.removeItem("loginUser");
    window.location.reload();
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Swasa Mart
          </Link>

          {loginUser && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav  ms-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active">
                      Welcome! {currentUser}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/ordershistory" className="nav-link">
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      <FaCartPlus /> {cartItems && cartItems.length}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={logout}>
                      logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Header;
