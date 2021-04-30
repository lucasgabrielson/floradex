import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div class="overlay">
      <form onSubmit={login}>
        <div className="con">
          <br/>
          <br/>
          <br/>
          <br/>
          <header className="head-form">
            <Typography
              variant="h2"
              style={{
                fontFamily: 'redressed',
                justifyContent: 'center'
              }}
            >
              Log In
            </Typography>
          </header>
          <br />
          <div className="field-set">
            <input
              className="form-input"
              id="txt-input"
              placeholder="username"
              required
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <input
              className="form-input"
              id="pwd"
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />{' '}
            <br />
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              value="Log In"
              style={{
                width: '100%',
                marginTop: 30,
              }}
            >
              {' '}
              Login{' '}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;