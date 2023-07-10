import React from 'react';
import Navbar from '../NavBar/NavBar';
import "./Contact.css"
import contact_img from "../../assets/contact.png";
import Footer from '../footer/Footer';
const Contact = () => {
  return (
    <React.Fragment>
        <Navbar/>
      <section className="contact">
        <div className="contact-container">
          <div className="contact-wrapper   animate__animated animate__fadeIn">
            <div className="contact-img">
              <img src={contact_img} alt="contact_img" />
            </div>

            <div className="contact-form">
              <div className="contact-info">
                <h1 className="contact-title">
                  Contact us
                  <br />
                  it's easy
                </h1>

                <p className="contact-desc">
                  Have any questions ? We would love to hear from you
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                </p>
              </div>
              <form className="contact-form">
                <input type="email" placeholder="your email adress" />

                <textarea name="" id="" placeholder="your message...">
                  {' '}
                </textarea>
                <div className="btn-wrapper">
                  <button className="contact-btn">send the message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    </React.Fragment>
  );
};

export default Contact;
