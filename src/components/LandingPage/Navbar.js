import React, { useState } from "react";
import { Link } from "react-router-dom";
import WebStoriesIcon from '@mui/icons-material/WebStories';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeblurIcon from '@mui/icons-material/Deblur';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light mt-3">
      <div className="container mb-4">
      
        <Link
          to="/"
          className="navbar-brand"
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "#31304D",
            fontFamily: "Poppins",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <div className="material-icons">web_stories</div> */}
            <DeblurIcon />

            <div
              style={{ color: "#31304D", fontSize: "22px", marginLeft: "08px" }}
            >
              Pepwalk
            </div>
          </div>
        </Link>

<div className=" desktop-menu">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight : '5rem'
          }}
        >
          <div>
            <ul className="navbar-nav">
              <li>
                <Link to="/all-sneakers" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      font : "poppins",
                      fontSize: "17px",
                      color: "#31304D",
                      marginLeft: "16px",
                      marginRight: "16px",
                      fontWeight : 500
                    }}
                  >
                    Sneakers
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/all-watches" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      color: "#31304D",
                      font : "poppins",
                      fontSize: "17px",
                      marginLeft: "16px",
                      marginRight: "16px",
                      fontWeight : 500
                    }}
                  >
                    Watches
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/all-bags" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      color: "#31304D",
                      font : "poppins",
                      fontSize: "17px",
                      marginLeft: "16px",
                      marginRight: "16px",
                      fontWeight : 500
                    }}
                  >
                    Bags
                  </div>
                </Link>
              </li>

             


              <li>
                <Link to="/pricing" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      color: "#31304D",
                      font : "poppins",
                      fontSize: "17px",
                      marginLeft: "16px",
                      marginRight: "16px",
                      fontWeight : 500

                    }}
                  >
                    + Sell
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/support"
                  style={{ textDecoration: "none", marginLeft : '16px', color : '#31304D' }}
                >
                  
                  <ShoppingCartIcon />
                </Link>
              </li>
            </ul>
          </div>

          <div style={{ paddingLeft: "22px" }}>
            <Link to="/login/brand" style={{ textDecoration: "none" }}>
              <button className="btn signup-btn-grad-desk-menu btn-g-fonts">
                Log In
              </button>
            </Link>
          </div>
        </div>

        </div>

        <div className="mobile-menu">
          <button
            className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        ></div>

        <div className={`menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/invoicing" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "60px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    change_circle
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Invoicing
                  </div>
                 
                </div>
              </Link>
            </li>

            <li>
              <Link to="/pricing" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    account_balance
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Payments
                  </div>
                 
                </div>
              </Link>
            </li>


            <li>
              <Link to="/onboarding" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    storefront
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Onboarding
                  </div>
                 
                </div>
              </Link>
            </li>



            <li>
              <Link to="/pricing" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    check_circle
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Pricing
                  </div>
                 
                </div>
              </Link>
            </li>

            <li>
              <Link to="/support" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    support_agent
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Support
                  </div>
                 
                </div>
              </Link>
            </li>

            <li>
              <Link to="/contact-us" onClick={toggleMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{ color: "#11009E", fontSize: "22px" }}
                    className="material-icons"
                  >
                    apartment
                  </div>
                  <div
                    style={{
                      color: "#11009E",
                      fontSize: "18px",
                      marginLeft: "18px",
                    }}
                  >
                    Contact Us
                  </div>
                 
                </div>
              </Link>
            </li>
          </ul>

          <div style={{ paddingLeft: "22px" }}>
            <Link to="/login/brand" style={{ textDecoration: "none" }}>
              <button className="btn signup-btn-grad-side-menu btn-g-fonts">
                Log In
              </button>
            </Link>
          </div>

          <div style={{ paddingLeft: "22px", marginTop: "16px" }}>
            <Link to="/signup/brand" style={{ textDecoration: "none" }}>
              <button className="btn signup-btn-grad-side-menu btn-g-fonts">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
