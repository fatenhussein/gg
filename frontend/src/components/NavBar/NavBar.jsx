import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import './Navbar.css';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Store } from '../../Store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/logo.png';
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/';
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <LinkContainer to="/">
          <a href="index.html" className="logo">
            <img src={logo} alt="upscale tast" />
          </a>
        </LinkContainer>
        <button className="navbar-toggler" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`navbar-menu ${showMenu ? 'show' : ''}`}>
        <ul>
          <li>
        
              <Link to="/" className="nav-link">Home</Link>
         
          </li>
          <li>
          
              {' '}
              <Link to="/about" className="nav-link">About</Link>
          
          </li>
          <li>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
              
            )}
          </li>
          <li>
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/designers">
                  <NavDropdown.Item>Designers</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </li>
          <li>
           
              <Link to="/shop"  className="nav-link">Shop</Link>
         
          </li>
          <li>
            
              {' '}
              <Link to="/designers"  className="nav-link">Designers</Link>
          
          </li>
          <li>
         
              {' '}
              <Link to="/contact"  className="nav-link">Contact</Link>
            
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
