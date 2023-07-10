import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import './footer.css';
import logo from '../../assets/logo.png';
const Footer = () => {
  return (
    <footer>
      <div className="foter-container">
        <div className="footer__wrapper">
          <div className="footer__col1">
            <div className="footer__logo">
              <a href="index.html" className="logo">
                <img src={logo} alt="upscale tast" />
              </a>
            </div>
            <div className="footer__socials">
              <h4 className="footer__socials__title">Follow us</h4>
              <ol>
                <li>
                  <Link href="#" className="footer__socials-Link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer__socials-Link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="footer__socials-Link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </Link>
                </li>
              </ol>
            </div>
          </div>
          <div className="footer__col2">
            <h3 className="footer__text__title">Links</h3>
            <ol className="footer__text">
              <li>
                {' '}
                <Link to="/" className="footer-links">
                  Home
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/contact" className="footer-links">
                  Contact
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/about" className="footer-links">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className="footer-links">
                  Shop
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/designers" className="footer-links">
                  Designers
                </Link>
              </li>

              <li>
                {' '}
                <Link to="/signin" className="footer-links">
                  Sign In
                </Link>
              </li>
              <li>
              {' '}
                <Link to="/signup" className="footer-links">
                  Sign Up
                </Link>
              </li>
            </ol>
          </div>

          <div className="footer__col3">
            <h3 className="footer__text__title">Support</h3>
            <ol className="footer__text">
              <li>
                {' '}
                <Link to="/contact" className="footer-links">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="footer-links">Support center </Link>
              </li>
              <li>
                <Link href="#" className="footer-links">
                  Feedback
                </Link>
              </li>
            </ol>
          </div>

          <div className="footer__col4">
            <h3 className="footer__text__title">Contact</h3>
            <ol className="footer__text">
              <li>
                <Link className="footer-links">0777****</Link>
              </li>
              <li>
                <Link className="footer-links">UpScaleTaste@gmail.com</Link>
              </li>
              <li>
                <Link className="footer-links"> 7th Circle,Amman, Jordan</Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="text-center p-3   text-light">
        © 2023 Copyright:
        <Link className="text-light" href="/">
          UpScaleTaste.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
