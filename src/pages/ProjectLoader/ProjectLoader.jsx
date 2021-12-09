import React, { useContext, useState, useEffect } from 'react';
import styles from './ProjectLoader.module.scss';
import { GlobalContext } from '../../context/reducers/globalReducer';
import OpenFolder from '../../components/OpenFolder/OpenFolderButton.jsx';
import { Button, TextField } from '@material-ui/core';

const ProjectLoader = () => {
  const [{ isFileDirectoryOpen }, dispatchToGlobal] = useContext(GlobalContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const addHttps = (url) => {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      return url;
    } else if (url.startsWith('localhost')) {
      url = 'http://' + url;
      return url;
    } else {
      url = 'https://' + url;
      return url;
    }
  };

  //updates state when user enters username as login input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //updates state when user enters password as login input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) {
      setMessage('invalid username / password combo');
      return;
    }
    handleLogout();
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ssid) {
          setIsLoggedIn(true);
        } else if (typeof data === 'string') {
          setMessage(data);
        } else setMessage('Login Failed: Unknown');
      })
      .catch((err) => console.log(err));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) {
      setMessage('invalid username / password combo');
      return;
    }
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    fetch('http://localhost:3001/logout')
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const onFailure = (response) => console.error(response);

  const renderLogin = () => (
    <div className={styles.contentBox}>
      <form onSubmit={handleLogin}>
        <TextField
          id='username'
          name='username'
          value={username}
          onChange={handleUsernameChange}
          label='Username'
        />
        {/* <input placeholder="username" name="username" value={username} className="inputField" type="text" onChange={handleUsernameChange} /> */}
        <br />
        <br />
        <TextField
          id='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          label='Password'
          type='password'
        />
        <br />
        <br />
        <span>{message}</span>
        <br />
        <br />
        <Button variant='contained' type='submit' id={styles.loginBtn}>
          Log In
        </Button>
        <Button variant='outlined' type='button' onClick={handleSignup} id={styles.loginBtn}>
          Sign up
        </Button>
        <br />
      </form>
      <Button variant='text' id={styles.gitButton}>Login with GitHub</Button>
    </div>
  );

  return (
    <div id={styles.projectLoader}>
      <section id={styles.upperPart}>
        <span id={styles.title}>spearmint</span>
        <svg
          id={styles.leaf}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <path
            fill='#ffffff'
            d='M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z'
          />
        </svg>
        <span id={styles.purpose}>testing, simplified</span>
      </section>

      <section id={styles.lowerPart}>
        <div id={styles.appBox}>
          {/* Open Project Directory If User is Logged In */}
          {!isLoggedIn ? (
            renderLogin()
          ) : (
            <div className={styles.contentBox}>
              <span className={styles.text}>Currently logged in as {username}!</span>
              <br />
              <br />
              <br />
              <span className={styles.text}>Select your application:</span>
              <br />
                <OpenFolder />
                <br />
                <br />
                <br />
                <Button variant='contained' type='button' onClick={handleLogout} id={styles.loginBtn}>
                LOGOUT
                </Button>
                <br />
            </div>
          )}
        </div>

        {/* Get started */}
      </section>
    </div>
  );
};

export default ProjectLoader;
