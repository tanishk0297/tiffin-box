import '../App.css';
import { Helmet } from "react-helmet";

import { useState } from 'react';
import UserService from '../services/UserService';
import bookingService from '../services/bookingService';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import './Credit.css';
import './bigfoot.scss';

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
  const ValidateFormb = async () => {
    var isFormValid = true
    var message = {}
    message.Area = await ValidateArea1()
    if (message.Area) {
      isFormValid = false
    }
    message.Duration = await ValidateDuration1()
    if (message.Duration) {
      isFormValid = false
    }
    message.Packages = await Validatepackages1()
    if (message.Packages) {
      isFormValid = false
    }
    setErrorMessageb(message)
    return isFormValid
  }
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
  const onLoginClick = async (e) => {
    e.preventDefault();
    if (await ValidateForm1()) {

      await UserService.Login(loginState)
        .then(async (response) => {
          if (response?.data.status === 0) {
            alert('Please activate your account first');

          }
          else if ((response?.data.status === 1) && (response?.data.Token)) {
            //alert('you have logged in successfully');
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
      <div id="menu-bar" className="fas fa-bars"></div>
      <a href="#" className="logo"><span>Tiffin</span> Box</a>
      <nav className="navbar">
        <a href="#home">home</a>
        <a href="#book">book</a>
        <a href="#packages">packages</a>
        <a href="#services">services</a>

        <Link to="/review" className="tanishk-link">review</Link>
        <a href="#contact">contact</a>
      </nav>
      <div className="icons" style={{ color: '#fff' }}>
        {/* <i className="fas fa-search" id="search-btn"></i> */}
        <i className="fas fa-user" id="login-btn" onClick={() => { setShowScreen('Login') }}></i>
        {localStorage.getItem('UserObject') ? 'Welcome ' + JSON.parse(localStorage.getItem('UserObject')).email.substring(0, JSON.parse(localStorage.getItem('UserObject')).email.lastIndexOf('@')) : ''}

      </div>
      {/* <form action="" className="search-bar-container">
        <input type="search" id="search-bar" placeholder="search here..." />
        <label for="search-bar" className="fas fa-search"></label>
      </form> */}
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
    {/* <form>
        <div className="svgContainer">
          <div>
            <svg className="mySVG"  viewBox="0 0 200 200">
              <defs>
                <circle id="armMaskPath" cx="100" cy="100" r="100" />
              </defs>
              <clipPath id="armMask">
                <use xlinkHref="#armMaskPath" overflow="visible" />
              </clipPath>
              <circle cx="100" cy="100" r="100" fill="#a9ddf3" />
              <g className="body">
                <path className="bodyBGchanged" style={{display: 'none'}} fill="#FFFFFF" d="M200,122h-35h-14.9V72c0-27.6-22.4-50-50-50s-50,22.4-50,50v50H35.8H0l0,91h200L200,122z" />
                <path className="bodyBGnormal" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF" d="M200,158.5c0-20.2-14.8-36.5-35-36.5h-14.9V72.8c0-27.4-21.7-50.4-49.1-50.8c-28-0.5-50.9,22.1-50.9,50v50 H35.8C16,122,0,138,0,157.8L0,213h200L200,158.5z" />
                <path fill="#DDF1FA" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z" />
              </g>
              <g className="earL">
                <g className="outerEar" fill="#ddf1fa" stroke="#3a5e77" strokeWidth="2.5">
                  <circle cx="47" cy="83" r="11.5" />
                  <path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <g className="earHair">
                  <rect x="51" y="64" fill="#FFFFFF" width="15" height="35" />
                  <path d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9" fill="#fff" stroke="#3a5e77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
              <g className="earR">
                <g className="outerEar">
                  <circle fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" cx="153" cy="83" r="11.5" />
                  <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M153.7,78.9 c2.3,0,4.1,1.9,4.1,4.1c0,2.3-1.9,4.1-4.1,4.1" />
                </g>
                <g className="earHair">
                  <rect x="134" y="64" fill="#FFFFFF" width="15" height="35" />
                  <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M146.6,62.8 c4.9,4.6,8.4,9.4,10.6,14.2c-3.4-0.1-6.8-0.1-10.1,0.1c4,3.7,6.8,7.6,8.2,11.6c-2.1,0-4.2,0-6.3,0.2c2.6,4.1,3.8,8.3,3.7,12.5 c-1.2-0.7-3.4-1.4-5.2-1.9" />
                </g>
              </g>
              <path className="chin" d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1" fill="none" stroke="#3a5e77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path className="face" fill="#DDF1FA" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46" />
              <path className="hair" fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474" />
              <g className="eyebrow">
                <path fill="#FFFFFF" d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037 c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329 c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z" />
                <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M63.56,55.102 c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329 c1.197-3.043,2.287-6.104,3.267-9.179c4.087,2.004,8.427,3.761,12.996,5.226c0.545-3.348,0.986-6.696,1.322-10.037 c4.913-0.481,9.857-1.34,14.787-2.599" />
              </g>
              <g className="eyeL">
                <circle cx="85.5" cy="78.5" r="3.5" fill="#3a5e77" />
                <circle cx="84" cy="76" r="1" fill="#fff" />
              </g>
              <g className="eyeR">
                <circle cx="114.5" cy="78.5" r="3.5" fill="#3a5e77" />
                <circle cx="113" cy="76" r="1" fill="#fff" />
              </g>
              <g className="mouth">
                <path className="mouthBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z" />
                <path style={{display: 'none'}} className="mouthSmallBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z" />
                <path style={{display: 'none'}} className="mouthMediumBG" d="M95,104.2c-4.5,0-8.2-3.7-8.2-8.2v-2c0-1.2,1-2.2,2.2-2.2h22c1.2,0,2.2,1,2.2,2.2v2 c0,4.5-3.7,8.2-8.2,8.2H95z" />
                <path style={{display: 'none'}} className="mouthLargeBG" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" fill="#617e92" stroke="#3a5e77" strokeLinejoin="round" strokeWidth="2.5" />
                <defs>
                  <path id="mouthMaskPath" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z" />
                </defs>
                <clipPath id="mouthMask">
                  <use xlinkhref="#mouthMaskPath" overflow="visible" />
                </clipPath>
                <g clipPath="url(#mouthMask)">
                  <g className="tongue">
                    <circle cx="100" cy="107" r="8" fill="#cc4a6c" />
                    <ellipse class="tongueHighlight" cx="100" cy="100.5" rx="3" ry="1.5" opacity=".1" fill="#fff" />
                  </g>
                </g>
                <path clip-path="url(#mouthMask)" class="tooth"style={{fill:'#FFFFFF'}} d="M106,97h-4c-1.1,0-2-0.9-2-2v-2h8v2C108,96.1,107.1,97,106,97z" />
                <path class="mouthOutline" fill="none" stroke="#3A5E77" strokeWidth="2.5" strokeLinejoin="round" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z" />
              </g>
              <path class="nose" d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#3a5e77" />
              <g class="arms" clip-path="url(#armMask)">
                <g class="armL" style={{visibility: 'hidden'}}>
                  <polygon fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" points="121.3,98.4 111,59.7 149.8,49.3 169.8,85.4" />
                  <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" d="M134.4,53.5l19.3-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-10.3,2.8" />
                  <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" d="M150.9,59.4l26-7c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-21.3,5.7" />

                  <g class="twoFingers">
                    <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" d="M158.3,67.8l23.1-6.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-23.1,6.2" />
                    <path fill="#A9DDF3" d="M180.1,65l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L180.1,65z" />
                    <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" d="M160.8,77.5l19.4-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-18.3,4.9" />
                    <path fill="#A9DDF3" d="M178.8,75.7l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L178.8,75.7z" />
                  </g>
                  <path fill="#A9DDF3" d="M175.5,55.9l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L175.5,55.9z" />
                  <path fill="#A9DDF3" d="M152.1,50.4l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L152.1,50.4z" />
                  <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M123.5,97.8 c-41.4,14.9-84.1,30.7-108.2,35.5L1.2,81c33.5-9.9,71.9-16.5,111.9-21.8" />
                  <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M108.5,60.4 c7.7-5.3,14.3-8.4,22.8-13.2c-2.4,5.3-4.7,10.3-6.7,15.1c4.3,0.3,8.4,0.7,12.3,1.3c-4.2,5-8.1,9.6-11.5,13.9 c3.1,1.1,6,2.4,8.7,3.8c-1.4,2.9-2.7,5.8-3.9,8.5c2.5,3.5,4.6,7.2,6.3,11c-4.9-0.8-9-0.7-16.2-2.7" />
                  <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M94.5,103.8 c-0.6,4-3.8,8.9-9.4,14.7c-2.6-1.8-5-3.7-7.2-5.7c-2.5,4.1-6.6,8.8-12.2,14c-1.9-2.2-3.4-4.5-4.5-6.9c-4.4,3.3-9.5,6.9-15.4,10.8 c-0.2-3.4,0.1-7.1,1.1-10.9" />
                  <path fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M97.5,63.9 c-1.7-2.4-5.9-4.1-12.4-5.2c-0.9,2.2-1.8,4.3-2.5,6.5c-3.8-1.8-9.4-3.1-17-3.8c0.5,2.3,1.2,4.5,1.9,6.8c-5-0.6-11.2-0.9-18.4-1 c2,2.9,0.9,3.5,3.9,6.2" />
                </g>
                <g class="armR" style={{visibility:' hidden'}}>
                  <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="2.5" d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z" />
                  <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="2.5" d="M252.4 52.4L233 47.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l10.3 2.8M226 76.4l-19.4-5.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l18.3 4.9M228.4 66.7l-23.1-6.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l23.1 6.2M235.8 58.3l-26-7c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l21.3 5.7" />
                  <path fill="#a9ddf3" d="M207.9 74.7l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM206.7 64l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM211.2 54.8l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM234.6 49.4l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8z" />
                  <path fill="#fff" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M263.3 96.7c41.4 14.9 84.1 30.7 108.2 35.5l14-52.3C352 70 313.6 63.5 273.6 58.1" />
                  <path fill="#fff" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M278.2 59.3l-18.6-10 2.5 11.9-10.7 6.5 9.9 8.7-13.9 6.4 9.1 5.9-13.2 9.2 23.1-.9M284.5 100.1c-.4 4 1.8 8.9 6.7 14.8 3.5-1.8 6.7-3.6 9.7-5.5 1.8 4.2 5.1 8.9 10.1 14.1 2.7-2.1 5.1-4.4 7.1-6.8 4.1 3.4 9 7 14.7 11 1.2-3.4 1.8-7 1.7-10.9M314 66.7s5.4-5.7 12.6-7.4c1.7 2.9 3.3 5.7 4.9 8.6 3.8-2.5 9.8-4.4 18.2-5.7.1 3.1.1 6.1 0 9.2 5.5-1 12.5-1.6 20.8-1.9-1.4 3.9-2.5 8.4-2.5 8.4" />
                </g>
              </g>




            </svg>
          </div>
        </div>

        <div class="inputGroup inputGroup1">
          <label for="loginEmail" id="loginEmailLabel">Email</label>
          <input type="email" id="loginEmail" maxlength="254" />
          <p class="helper helper1">email@domain.com</p>
        </div>
        <div class="inputGroup inputGroup2">
          <label for="loginPassword" id="loginPasswordLabel">Password</label>
          <input type="password" id="loginPassword" />
          <label id="showPasswordToggle" for="showPasswordCheck">Show
            <input id="showPasswordCheck" type="checkbox" />
            <div class="indicator"></div>
          </label>
        </div>
        <div class="inputGroup inputGroup3">
          <button id="login">Log in</button>
        </div>
      </form> */}
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
          <div className="inputbox">
            <h3>where in bhopal</h3>
            <input name="Area" type="text" placeholder="area name" value={bookingState.Area} onChange={onInputChangeb} onBlur={AreaBlur} />
            <div className='error'>{errorMessageb.Area}</div>
          </div>

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
      {/* <h1 className="credit">created by <span>Tanishk</span>| all rights reserved! </h1> */}
      <h1 className="credit">
        created by &nbsp;
        <Link to="/team" className="tanishk-link">Tanishk</Link>
        | all rights reserved!
      </h1>

    </section>
    <Helmet>
      <script src="/script.js" type="text/javascript" />

    </Helmet>
    <Helmet>


      <script type="module" src="/bigfoot.js"></script>
    </Helmet>
  </>
  );
}

