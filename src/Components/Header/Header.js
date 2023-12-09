import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import mainicon from "../assets/img/main-icon.png";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; 
import { AuthContext } from '../Authentication/AuthContext'; 
import { useContext } from 'react';


const Header = () => {


  const username = window.localStorage.getItem('fname') || 'User';
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedIn');
    setIsLoggedIn(false); // Update login state
    window.location.reload();
  };

  const navigateToLogin = () => {
    window.location.href = '/Login';
  };
  const navigateToSignUp = () => {
    window.location.href = '/sign-up';
  };

  

  

  return (
    <header className="header fixed-top">
      <Container fluid className="container-xl d-flex align-items-center justify-content-between">
        <Navbar.Brand href="/Home">
          <img src={mainicon} alt="" />
          <span className='company'>LuggShare</span>
        </Navbar.Brand>
        <Navbar expand="lg" id="navbar">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#footer">Contact Us</Nav.Link>
              <NavDropdown title="How it works?" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/seller">I Have Extra Space!</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/buyer">I Want Extra Space!</NavDropdown.Item>
              </NavDropdown>
              {/* Conditional rendering based on login status */}
              {isLoggedIn ? (
                  <div className='welcome'>
                      <span>Welcome, {username}! </span>
                      <button className='btn-logout' onClick={handleLogout}>Logout</button>
                  </div>
              ) : (
                  <div>
                      <button className='btn-login' onClick={navigateToLogin}>Login</button>
                     <button className='btn-signup' onClick={navigateToSignUp}>Sign Up</button> 
                  </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;


