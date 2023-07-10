import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import logo from '../../assets/logo.png';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Store } from '../../Store';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import SearchBox from '../SearchBox';
import './ShopNav.css';
const ShopNav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <React.Fragment>
      <div className="shop-navbar">
        <div className="shop-navbar-brand">
          <LinkContainer to="/">
            <a href="index.html" className="shop-logo">
              <img src={logo} alt="upscale tast" />
            </a>
          </LinkContainer>
          <SearchBox />
          <button className="shop-navbar-toggler" onClick={toggleMenu}>
            <span className="shop-navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`shop-navbar-menu ${showMenu ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="shop-nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Shop" className="shop-nav-link">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" className="shop-nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
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
                    className=" shop-nav-link  dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="shop-nav-link" to="/signin">
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
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShopNav;
