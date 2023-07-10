import React from 'react';
import Navbar from '../NavBar/NavBar';

import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import signup from '../../assets/signUp_img.png';
import './SignUp.css';
import Footer from '../footer/Footer';
const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <React.Fragment>
      <Navbar />
      <section className="sign-up">
        <div className="sign-up-container">
          <div className="sign-up-form__wrapper">
            <div className="signUp_Img">
              <img src={signup} alt="" className="img" />
            </div>
            <form onSubmit={submitHandler} className='sign-form'>
              <div className="signUp-label__input__wrraper">
                <label>First Name</label>
                <input
                  placeholder="enter your name..."
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="signUp-label__input__wrraper">
                <label for="e">Email</label>
                <input
                  placeholder="enter your email..."
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="signUp-label__input__wrraper">
                <label for="ci">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signUp-label__input__wrraper">
                <label for="ci">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm your password..."
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="signUp-form__button">
                <button type="submit" className="signUp-btn">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="Dont-p">
              Already have an account?
              <Link to={`/signin?redirect=${redirect}`} className="c-link">
                {' '}
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </React.Fragment>
  );
};

export default SignUp;
