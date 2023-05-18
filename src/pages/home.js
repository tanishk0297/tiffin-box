import '../App.css';
import { Helmet } from "react-helmet";

import { useState } from 'react';
import UserService from '../services/UserService';
import bookingService from '../services/bookingService';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import './Credit.css';
import './bigfoot.scss';
import React from 'react';
import Navbar from './navbar.js';

export const Home = () => {
  const [state, setState] = useState({ EMailId: '', Password: '' })
  const [errorMessage, setErrorMessage] = useState({ EMailId: null, Password: null })
  const [errorMessageb, setErrorMessageb] = useState({ Area: null, Duration: null })
  const [errorMessage1, setErrorMessage1] = useState({ EMailId: null, Password: null })
  const [loginState, setloginState] = useState({ EMailId: '', Password: '' })
  const [showScreen, setShowScreen] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [bookingState, setbookingState] = useState({ Area: '', Duration: '', Packages: '' })
  const container = document.getElementById('login-container');
  const ref = useRef(null);



  const handleClick = (value) => {
    setbookingState({ ...bookingState, Packages: value })
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onInputChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value })
  }
  const onInputChange1 = (e) => {
    setloginState({ ...loginState, [e.target.name]: e.target.value })
  }
  const onInputChangeb = (e) => {
    setbookingState({ ...bookingState, [e.target.name]: e.target.value });
  };

  const EMailIdBlur = async (event) => {
    var message = await ValidateEMailId()
    setErrorMessage(prevState => {
      return { ...prevState, EMailId: message }
    });
  }
  const AreaBlur = async (event) => {
    var message = await ValidateArea1()
    setErrorMessageb(prevState => {
      return { ...prevState, Area: message }
    });
  }
  const DurationBlur = async (event) => {
    var message = await ValidateDuration1()
    setErrorMessageb(prevState => {
      return { ...prevState, Duration: message }
    });
  }
  const PackagesBlur = async (event) => {
    var message = await Validatepackages1()
    setErrorMessageb(prevState => {
      return { ...prevState, Packages: message }
    });
  }
  const EMailIdBlur1 = async (event) => {
    var message = await ValidateEMailId()
    setErrorMessage(prevState => {
      return { ...prevState, EMailId: message }
    });
  }
  const ValidateEMailId1 = async () => {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (loginState.EMailId.trim() === '') {
      return 'E-Mail is required'
    }
    else if (!loginState.EMailId.trim().toLowerCase().match(mailformat)) {
      return 'Invalid E-Mail format'
    }

    else {
      return null
    }
  }
  const PasswordBlur1 = async (event) => {
    var message = await ValidatePassword1()
    setErrorMessage(prevState => {
      return { ...prevState, Password: message }
    });
  }
  const ValidatePassword1 = async () => {
    if (loginState.Password.trim() === '') {
      return 'Password is required'
    }
    else {
      return null
    }
  }

  const ValidateArea1 = async () => {
    if (bookingState.Area.trim() === '') {
      return 'Area is required'
    }
    else {
      return null
    }
  }
  const ValidateDuration1 = async () => {
    if (bookingState.Duration.trim() === '') {
      return 'Duration is required'
    }
    else {
      return null
    }
  }
  const Validatepackages1 = async () => {
    if (bookingState.Packages.trim() === '') {
      return 'Please Select Your Package'
    }
    else {
      return null
    }
  }
  const ValidateForm1 = async () => {
    var isFormValid = true
    var message = {}
    message.EMailId = await ValidateEMailId1()
    if (message.EMailId) {
      isFormValid = false
    }
    message.Password = await ValidatePassword1()
    if (message.Password) {
      isFormValid = false
    }
    setErrorMessage1(message)
    return isFormValid
  }
  // const ValidateFormb = async () => {
  //   var isFormValid = true
  //   var message = {}
  //   message.Area = await ValidateArea1()
  //   if (message.Area) {
  //     isFormValid = false
  //   }
  //   message.Duration = await ValidateDuration1()
  //   if (message.Duration) {
  //     isFormValid = false
  //   }
  //   message.Packages = await Validatepackages1()
  //   if (message.Packages) {
  //     isFormValid = false
  //   }
  //   setErrorMessageb(message)
  //   return isFormValid
  // }

  const ValidateFormb = async () => {
    var isFormValid = true;
    var message = {};
    message.Area = await ValidateArea1();
    if (message.Area) {
      isFormValid = false;
    }
    message.Duration = await ValidateDuration1();
    if (message.Duration) {
      isFormValid = false;
    }
    message.Packages = await Validatepackages1();
    if (message.Packages) {
      isFormValid = false;
    }
    setErrorMessageb(message);

    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('UserObject')); // Assuming 'UserObject' contains the user data in localStorage
    const isLoggedIn = userData && userData.Token;

    if (!isLoggedIn) {
      alert('Please log in before making a booking.');
      return false;
    }


    return isFormValid;
  };

  const ValidateEMailId = async () => {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (state.EMailId.trim() === '') {
      return 'E-Mail is required'
    }
    else if (!state.EMailId.trim().toLowerCase().match(mailformat)) {
      return 'Invalid E-Mail format'
    }
    else if (await EMailIdExists()) {
      return 'E-Mail already exists'
    }
    else {
      return null
    }
  }
  const PasswordBlur = async (event) => {
    var message = await ValidatePassword()
    setErrorMessage(prevState => {
      return { ...prevState, Password: message }
    });
  }
  const ValidatePassword = async () => {
    if (state.Password.trim() === '') {
      return 'Password is required'
    }
    else {
      return null
    }
  }
  const ValidateForm = async () => {
    var isFormValid = true
    var message = {}
    message.EMailId = await ValidateEMailId()
    if (message.EMailId) {
      isFormValid = false
    }
    message.Password = await ValidatePassword()
    if (message.Password) {
      isFormValid = false
    }
    setErrorMessage(message)
    return isFormValid
  }
  const onSubmitClick = async (e) => {
    e.preventDefault();
    if (await ValidateForm()) {

      await UserService.Register(state)
        .then(async (response) => {
          if (response?.data.email.length > 0) {
            //alert('you have signed up successfully');
            setSignupSuccess(true)
          }
        })
        .catch(async (e) => {
          console.log(e);
        });
    }
  }
  const onBookClick = async (e) => {
    e.preventDefault();
    if (await ValidateFormb()) {

      await bookingService.book(bookingState)
        .then(async (response) => {
          if (response?.data.Area.length > 0) {
            alert('you have booked successfully');
            //setSignupSuccess(true)
            setbookingState({ Area: '', Duration: '', Packages: '' })
          }
        })
        .catch(async (e) => {
          console.log(e);
        });
    }
  }
  // const onBookClick = async (e) => {
  //   e.preventDefault();

  //   // Check if user is logged in
  //   const isLoggedIn = localStorage.getItem('email') !== null; // Assuming 'Token' is stored in localStorage upon successful login

  //   // Check if user data in local storage is null
  //   const userObject = JSON.parse(localStorage.getItem('UserObject')); // Assuming 'UserObject' is stored in localStorage upon successful login
  //   const isUserDataNull = userObject === null;

  //   if (!isLoggedIn || isUserDataNull) {
  //     alert('Please log in before making a booking.');
  //     return;
  //   }

  //   if (await ValidateFormb()) {
  //     await bookingService
  //       .book(bookingState)
  //       .then((response) => {
  //         if (response?.data?.Area?.length > 0) {
  //           alert('You have booked successfully.');
  //           setbookingState({ Area: '', Duration: '', Packages: '' });
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };


  const onLoginClick = async (e) => {
    e.preventDefault();
    if (await ValidateForm1()) {

      await UserService.Login(loginState)
        .then(async (response) => {
          if (response?.data.status === 0) {
            alert('Please activate your account first');

          }
          else if ((response?.data.status === 1) && (response?.data.Token)) {
            // alert('you have logged in successfully');
            localStorage.setItem('UserObject', JSON.stringify(response.data))

            setShowScreen('')
          }
          else {
            //alert('invalid login id or password');
            setErrorMessage1(prevState => {
              return { ...prevState, Password: 'invalid login id or password' }
            });
          }
        })
        .catch(async (e) => {
          console.log(e);
        });
    }
  }
  const EMailIdExists = async () => {
    let Exists = true
    let data = { EMailId: state.EMailId }
    await UserService.Duplicate(data)
      .then(response => {
        Exists = response.data
      })
      .catch(e => {
        console.log(e);
      });
    return Exists
  }
  return (<>
    <header>
      <div>

        <Navbar setShowScreen={setShowScreen} />
      </div>

    </header>

    <div className={"signup-form-container " + (showScreen === 'Signup' ? 'active' : '')}>
      <div id="login-container"></div>
      <i className="fas fa-times" id="form-close" onClick={() => { setShowScreen('') }}></i>

      <form>

        <h3>Signup</h3>
        {signupSuccess ?
          <>
            You have signed up successfully. Now <a href='https://mail.google.com/mail/u/0/#all' target="_blank" > <b>Activate</b></a> your account before <a href='#' onClick={() => { setShowScreen('Login') }}> <b>Login</b></a>. check your e-mail for activation mail.
          </>

          :
          <>
            <input id="EMailId" value={state.EMailId} onChange={onInputChange}
              // onBlur={EMailIdBlur}
              type="email" className="box" placeholder="Enter your email" />
            <div className='error'>{errorMessage.EMailId}</div>
            <input id="Password" value={state.Password} onChange={onInputChange} onBlur={PasswordBlur} type="password" className="box" placeholder="Enter your password" />
            <div className='error'>{errorMessage.Password}</div>
            <input type="button" value="Signup" className="btn" onClick={(e) => { onSubmitClick(e) }} />
            <p>already registered?<a href="#" onClick={() => { setShowScreen('Login') }}>Login</a></p>
          </>
        }
      </form>

    </div>
    <div className={"login-form-container " + (showScreen === 'Login' ? 'active' : '')}>
      <i className="fas fa-times" id="form-close" onClick={() => { setShowScreen('') }}></i>
      <form>
        <h3>Login</h3>
        <input name="EMailId" value={loginState.EMailId} onChange={onInputChange1} onBlur={EMailIdBlur1} type="email" className="box" placeholder="Enter your email" />
        <div className='error'>{errorMessage1.EMailId}</div>
        <input name="Password" value={loginState.Password} onChange={onInputChange1} onBlur={PasswordBlur1} type="password" className="box" placeholder="Enter your password" />
        <div className='error'>{errorMessage1.Password}</div>
        <input type="button" value="Login" className="btn" onClick={(e) => { onLoginClick(e) }} />
        <input type="checkbox" id="remember" />
        <label for="remember">remember me</label>
        <p>Register Now<a href="#" onClick={() => { setShowScreen('Signup') }}>Signup</a></p>
      </form>
    </div>

    <section className="home" id="home">
      <div className="content">
        <h3>Adventure is worthwhile</h3>
        <p> discover new places with us,adventure awaits</p>
        <a href="#book" className="btn">discover more</a>
      </div>

      <div className="controls">
        <span className="vid-btn" data-src="pexels-george-pak-7815139-2160x3840-60fps"></span>
      </div>
      <div className="video-container">
        <video src="/assets/pexels-george-pak-7815139-2160x3840-60fps.mp4" id="video-slider" autoPlay loop muted></video>
      </div>

    </section>

    <section className="book" id="book">
      <h1 className="heading">
        <span>b</span>
        <span>o</span>
        <span>o</span>
        <span>k</span>
        <span className="space"></span>
        <span>n</span>
        <span>o</span>
        <span>w</span>
      </h1>
      <div className="row" ref={ref}>
        <div className="image">
          <img src="/assets/pngegg.png" alt="" />
        </div>
        <form action="">
          <h3>Packages</h3>
          {/* <input name="Address" type="drop" placeholder="your address" value={bookingState.Address} onChange={onInputChangeb} /> */}
          <select name="Area" className='bookselect' value={bookingState.Packages} onChange={onInputChangeb} onBlur={PackagesBlur}>
            <option value="">Were in Bhopal</option>
            <option value="INDRAPURI">Two Time Meal</option>
            <option value="PATEL NAGAR">Three Time Meal</option>
            <option value="ANAND NAGAR">Three Time Deluxe Meal</option>
          </select>
          <div className="inputbox">
            <h3>For how many days</h3>
            <input name="Duration" type="number" placeholder="for how many days" value={bookingState.Duration} onChange={onInputChangeb} onBlur={DurationBlur} />
            <div className='error'>{errorMessageb.Duration}</div>
          </div>

          <div className="inputbox">
            <h3>Packages</h3>
            {/* <input name="Address" type="drop" placeholder="your address" value={bookingState.Address} onChange={onInputChangeb} /> */}
            <select name="Packages" className='bookselect' value={bookingState.Packages} onChange={onInputChangeb} onBlur={PackagesBlur}>
              <option value="">Select your package</option>
              <option value="Two Time Meal">Two Time Meal</option>
              <option value="Three Time Meal">Three Time Meal</option>
              <option value="Three Time Deluxe Meal">Three Time Deluxe Meal</option>

            </select>
            <div className='error'>{errorMessageb.Packages}</div>
          </div>
          <input type="button" className=" btn" value="book now" onClick={(e) => { onBookClick(e) }} onBlur={PasswordBlur1} />
        </form>
      </div>

    </section>
    <br />
    <br />
    <br />
    <section className="packages" id="packages">
      <h1 className="heading">
        <span>p</span>
        <span>a</span>
        <span>c</span>
        <span>k</span>
        <span>a</span>
        <span>g</span>
        <span>e</span>
        <span>s</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <img src="/assets/pngwing.com.png" alt="" />
          <div className="content">
            <h3><i className=" fas fa-map-marker-alt"></i> Two time meal</h3>
            <p>Two meals a day from a tiffin center or mess can be a convenient option for busy individuals. With our service, find a mess or tiffin center that provides fresh and healthy meals for lunch and dinner. Our partners offer a variety of food options, ensuring a balanced and nutritious diet. Save time and money on meal preparation while enjoying delicious food with our service.</p>
            <div className="price">2200 RS/month <span> 2500 RS/month</span> </div>
            <a href="javascript:void(0)" className="btn" onClick={() => handleClick("Two Time Meal")}>book now </a>
          </div>
        </div>

        <div className="box">
          <img src="/assets/Daco_4325547.png" alt="" />
          <div className="content">
            <h3><i className=" fas fa-map-marker-alt"></i> Three time meal</h3>
            <p>Maintain a healthy and balanced diet with three fresh meals a day from a mess or tiffin center. With our service, you can easily find a partner that offers breakfast, lunch, and dinner. Save time and effort on meal preparation while still enjoying delicious and healthy food options. Whether you're a student, a working professional, or just someone who wants to eat healthy, our service can help you find the perfect three meal plan</p>
            <div className="price">2500 RS/month <span> 2900 RS/month</span></div>
            <a href="javascript:void(0)" className="btn" onClick={() => handleClick("Three Time Meal")}>book now </a>
          </div>
        </div>

        <div className="box">
          <img src="/assets/pngaaa.com-612468.png" alt="" />
          <div className="content">
            <h3><i className=" fas fa-map-marker-alt"></i> Three time delux meal</h3>
            <p>Three meals a day from a tiffin center or mess can be a convenient option for busy individuals. With our service, find a mess or tiffin center that provides fresh and healthy meals for breakfast, lunch, and dinner. Our partners offer a variety of food options, ensuring a balanced and nutritious diet. Save time and money on meal preparation while enjoying delicious food with our service.</p>
            <div className="price">3000 RS/month <span> 3400 RS/month</span></div>
            <a href="javascript:void(0)" className="btn" onClick={() => handleClick("Three Time Deluxe Meal")}>book now </a>
          </div>
        </div>
      </div>

    </section>

    <section className="services" id="services">
      <h1 className="heading">
        <span>s</span>
        <span>e</span>
        <span>r</span>
        <span>v</span>
        <span>i</span>
        <span>c</span>
        <span>e</span>
        <span>s</span>
      </h1>

      <div className="box-container">
        <div className="box">
          <i className="fas fa-hotel"></i>
          <h3>nearby locations </h3>
          <p> Our website provides a convenient and easy way to find the closest tiffin centers near your location. Whether you are a student, a working professional, or a traveler, our service helps you discover the best and most affordable options for delicious and healthy meals. Say goodbye to long searches and enjoy a hassle-free dining experience with our solutions.</p>

        </div>
        <div className="box">
          <i className="fas fa-utensils"></i>
          <h3>affordable food</h3>
          <p> Our service is committed to providing a convenient and easy way to find the closest tiffin centers near your location. Whether you are a student, a working professional, or a traveler, our platform helps you discover the best and most affordable options for delicious and healthy meals. Say goodbye to long searches and enjoy a hassle-free dining experience with our comprehensive and reliable solutions. Our focus is on helping you find the perfect place to eat, without breaking the bank.</p>

        </div>
        <div className="box">
          <i className="fas fa-bullhorn"></i>
          <h3>safety guide</h3>
          <p> At our service, your safety is our priority. We recommend researching the area ahead of time, choosing well-lit and populated areas, keeping your belongings secure, using reputable transportation, and trusting your instincts. By following these guidelines, you can enjoy your search for the perfect tiffin center or hostel with peace of mind. Our goal is to provide you with the best and safest options for comfortable living and delicious meals, so you can make the most of your experience.</p>

        </div>
        <div className="box">
          <i className="fas fa-hands-wash"></i>
          <h3>hygeine</h3>
          <p> Hygiene is a top priority when it comes to dining and living at a tiffin center or hostel. That's why our service provides listings for places that prioritize cleanliness and sanitation. We ensure our partners maintain high hygiene standards by conducting regular inspections and monitoring reviews. By choosing a tiffin center or hostel through us, you can be assured that your health and safety are our top priorities.</p>

        </div>
        <div className="box">
          <i className="fas fa-concierge-bell"></i>
          <h3>variety of mess</h3>
          <p> Our service provides a wide variety of mess and tiffin center options to cater to different tastes and preferences. We offer vegetarian and non-vegetarian options, customizable meal plans, and an extensive range of choices. With our options, you're sure to find the perfect mess or tiffin center to satisfy your hunger and meet your needs."</p>

        </div>

        <div className="box">
          <i className="fas fa-seedling"></i>
          <h3>fresh food</h3>
          <p> Our service understands the importance of fresh and healthy food, and we prioritize partnering with tiffin centers and mess that use fresh ingredients and prepare meals daily. We ensure that the food served is hygienic, healthy, and tasty. We also provide information on the freshness and quality of food in our listings. By choosing a tiffin center or mess through our service, you can be assured of enjoying fresh and healthy food that meets your expectations.</p>

        </div>

      </div>

    </section>


    <section className="contact" id="contact">
      <h1 className="heading">
        <span>c</span>
        <span>o</span>
        <span>n</span>
        <span>t</span>
        <span>a</span>
        <span>c</span>
        <span>t</span>
      </h1>
      <div className="row">
        <div className="image">
          <img src="/assets/restaurant-512.png" />
        </div>
        <form action="">
          <div className="inputBox">
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
          </div>
          <div className="inputBox">
            <input type="number" placeholder="number" />
            <input type="text" placeholder="subject" />
          </div>
          <textarea placeholder="message" name=" " id="" cols="30" rows="10"></textarea>
          <input type="submit" className="btn" value="send" />

        </form>
      </div>

    </section>
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>About Us</h3>
          <p>We are a dedicated online platform that simplifies the process of finding reliable and hygienic mess and tiffin centers in your area. Our goal is to provide accessible and affordable meal options that cater to diverse dietary needs and budgets. With a comprehensive list of verified options, we strive to offer the best customer service and ensure that our users can enjoy nutritious meals with confidence. </p>

        </div>
        <div className="box">
          <h3>branch locations</h3>
          <a href="#">bhopal</a>
          <a href="#">Coming Soon!</a>
          <a href="#">Coming Soon!</a>
          {/* <a href="#">bhopal</a> */}
        </div>

        <div className="box">
          <h3>quick links</h3>
          <a href="#home">home</a>
          <a href="#book">book</a>
          <a href="#packages">packages</a>
          <a href="#services">services</a>

          <a href="#review">review</a>

          <a href="#contact">contact</a>
        </div>
        <div className="box">
          <h3>follow us</h3>
          <a href="#">facebook</a>
          <a href="https://www.instagram.com/tiffinbox33/?igshid=ZGUzMzM3NWJiOQ%3D%3D">instagram</a>
          <a href="#">twitter</a>
          <a href="#">linkedin</a>
        </div>
      </div>

      <h1 className="credit">
        created by &nbsp;
        <Link to="/team" className="tanishk-link">Team Tiffin-Box </Link>
        | all rights reserved!
      </h1>

    </section>

  </>
  );
}

