import React from "react";
import { Nav, Form } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbars = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  return (
    <>
      {!loading && isAuthenticated ? (
        <>
          <Navbar bg='light' expand='lg' className='navbar'>
            <Navbar.Brand className='d-flex'>
              <Link className='navLink' style={{ color: "black" }} to='/'>
                <h2 style={{ fontFamily: "cursive", fontWeight: "bold" }}>
                  FATMUG |
                </h2>
              </Link>
              <h4 className='text-light ml-3 mt-2'>
                Welcome {user && user.name}
              </h4>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mx-auto'>
                <Nav.Link>
                  <Link className='navLink' to='/home'>
                    Dashboard
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <Link className='navLink' to='/publish'>
                    Publish
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className='navLink' to='/your-article'>
                    Your Article
                  </Link>
                </Nav.Link>

                <Nav.Link>
                  <button
                    className='navLink'
                    style={{ background: "none", border: "none", color: "red" }}
                    onMouseOver={(e) => (e.target.style.color = "blue")}
                    onMouseOut={(e) => (e.target.style.color = "red")}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbars);
