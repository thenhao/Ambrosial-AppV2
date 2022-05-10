import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ambrosialAxiosAPI } from '../../api/api';
import AdminApp from '../admin-app';
import LoginHeader from '../components/login-header';
import Popup from '../components/popup';
import ChangePassword from './change-password';
import './login.css';

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({username: '', password: ''});
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState('')

  const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  function handleOnChange(e) {
    let updatedCredentials = {...loginCredentials};
    updatedCredentials[e.target.name] = e.target.value;

    setLoginCredentials(updatedCredentials);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(loginCredentials.username === '' && loginCredentials.password === '') {
      setLoginPopupOpen(true);
      setModalVisibleLogin(true);
      setLoginMessage('Kindly enter both username and password.');
      setLoginStatus(false);
    }
    
    else if(loginCredentials.username === '')  {
      setLoginPopupOpen(true);
      setModalVisibleLogin(true);
      setLoginMessage('Kindly enter your username.');
      setLoginStatus(false);
    }

    else if(loginCredentials.password === '')  {
      setLoginPopupOpen(true);
      setModalVisibleLogin(true);
      setLoginMessage('Kindly enter your password.');
      setLoginStatus(false);
    }

    else{ 
      await ambrosialAxiosAPI.post('/login', {
        username: loginCredentials.username,
        password: loginCredentials.password
      })
      .then((response) => {
        console.log(`${response.config.method} method`, `for route: ${response.config.url}`);
        console.log(`response Status: ${response.status}`);
        console.log(`response Message: ${response.data}`);

        setLoginStatus(true);
      })
      .catch((error) => {
        console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.status}`);
        console.log(`Error Message: ${error.response.data}`);

        setLoginPopupOpen(true);
        setModalVisibleLogin(true);
        setLoginMessage('Invalid username/password. Please try again.');
        setLoginStatus(false);
      });
    }
  }
  function resetLoginStateToDefault() {
    setLoginCredentials({username: '', password: ''});
  }

  function togglePopupLogin() {
    resetLoginStateToDefault();
    setLoginPopupOpen(!loginPopupOpen);
    setModalVisibleLogin(!modalVisibleLogin);
  }

  return( 
    <>
      <Router>
        <Switch>
          <Route path="/admin"><AdminApp user={loginCredentials.username}/></Route>
          <Route path="/change-password"><ChangePassword /></Route>
          <div className='login-container'>
            <LoginHeader />
            <form className='login-form'>
              <div className='login-input'>
                <input id='username-input' type='text' autoComplete='off' placeholder='' value={loginCredentials.username} name='username' onChange={handleOnChange}/>
                <label className='login-username-label'>Username</label>
              </div>
              
              <div className='login-input'>
                <input id='password-input' type='password' placeholder='' minLength='8' value={loginCredentials.password} name='password' onChange={handleOnChange}/>
                <label className='login-pw-label'>Password</label>
              </div>

              <div className='login-forgot-password-div'>
                  <Link className='login-forgot-password-link' to="/change-password">Forgot Password</Link>
              </div>

              <div className='login-page-button-container'>
                <div className='login-button-div'>
                  <button className='login-button'onClick={handleSubmit}>Login
                    {loginStatus === true && <Redirect to="/admin" className='login-page-link' />}
                  </button>
                </div>
                
                {modalVisibleLogin && <div className='login-modal'>
                    {loginPopupOpen && <Popup
                      popupType='loginPopup'
                      handleClose={togglePopupLogin}
                      content={loginMessage}/>
                    }  
                  </div>
                }
                
                <div className='login-cancel-button-div'>
                  <button className='login-cancel-button'>
                    <Link to="/" className='login-link' />Cancel
                  </button>
                </div>
              </div>
            </form> 
          </div>
        </Switch>
      </Router>
    </>
  )
}

export default Login;
