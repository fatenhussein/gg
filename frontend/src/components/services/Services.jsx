import React from "react";
import "./services.css";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import designersImg from "../../assets/designers.png";
import shopImg from "../../assets/art.png";
import 'animate.css';
const Services = () => {
  return (
    <div className="serv__container">
      <div className="services__wrapper">
        <div className="services__title animate__animated animate__fadeIn"><h1>services</h1></div>
        <div className="cards__wrapper">
          <div className="card animate__animated animate__fadeInLeft">
            <div className="card__img">
              <img src={designersImg} alt="" />
            </div>
            <div className="card__title">
              <Link to="/designers"><h1>designers</h1></Link>
            </div>
            <div className="card__desc">
              <p>
                If you want to design and change the features of your own space,
                whatever it is, do not hesitate to communicate{" "}
              </p>
            </div>
          </div>
          <div className="card animate__animated animate__fadeInRight">
            <div className="card__img">
              <img src={shopImg} alt="" />
            </div>

            <div className="card__title">
              <Link to="/shop"><h1>shop</h1></Link>
            </div>
            <div className="card__desc">
              <p>
                Everything we have is new , get what you want of beauty ,
                quality and splendor through the unique pieces we have .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
