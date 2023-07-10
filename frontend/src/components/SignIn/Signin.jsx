import React from 'react';
import Navbar from '../NavBar/NavBar';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import './Signin.css';
import login_img from '../../assets/login_img.png';
import Footer from '../footer/Footer';


const Signin = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
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
      <section className="sign-in">
        <div className="signIn-container">
          <div className="form__wrapper">
            <div className="login_Img">
              <img src={login_img} alt="" />
            </div>
            <form onSubmit={submitHandler} className='sign-in-form'>
              <div className="label__input__wrraper">
                <label htmlFor="fname">UserName</label>
                <input
                  type="text"
                  id="fname"
                  name="name"
                  placeholder="Type your name.."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="label__input__wrraper">
                <label htmlFor="ci">Password</label>
                <input
                  type="password"
                  placeholder="Type your password.."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form__button">
                <button className="sign-in-btn">Sign in</button>
              </div>
            </form>
            <p className="Dont-p">
              Don't have an account?
              <Link to={`/signup?redirect=${redirect}`} className="c-link">
                {' '}
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </React.Fragment>
  );
};

export default Signin;
