import { useEffect } from 'react';
import React from 'react';
import './Credit.css';


import teamMember1 from '../creditimages/1.jpg';
import teamMember2 from '../creditimages/2.jpeg';
import teamMember3 from '../creditimages/3.jpg';
import teamMember4 from '../creditimages/4.jpg';
import teamMember5 from '../creditimages/5.jpg';


  export const TeamPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top on page load
    }, []);
  
  return(
    <section  style={{ overflow: 'hidden' }}>
      <div className="row">
        <h1>Our Team</h1>
      </div>
      <div className="row">
        {/* Column 1 */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={teamMember1} alt="Profile" />
            </div>
            <h3>Sneh Sagar Shrivastava</h3>
            <p>Front-end Developer</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={teamMember2} alt="Profile" />
            </div>
            <h3>Tanishk Shrivastava</h3>
            <p>Back-end & Database Developer</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={teamMember3} alt="Profile" />
            </div>
            <h3>Yashashvi Jaiswal</h3>
            <p>R&D, Content Social Links</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={teamMember4} alt="Profile" />
            </div>
            <h3>Uditanshu Singh</h3>
            <p>Git n Github </p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="img-container">
              <img src={teamMember5} alt="Profile" />
            </div>
            <h3>Trivendra Sharma</h3>
            <p>Tester</p>
            <div className="icons">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
              <a href="#">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


