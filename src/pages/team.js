import { useEffect } from 'react';
import React from 'react';
import './Credit.css';


import teamMember1 from './1.png';


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
              <img src={teamMember1} alt="Profile" />
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
              <img src={teamMember1} alt="Profile" />
            </div>
            <h3>Yashshivi Jaiswal</h3>
            <p>UI/UX Designer</p>
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
              <img src={teamMember1} alt="Profile" />
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
              <img src={teamMember1} alt="Profile" />
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


