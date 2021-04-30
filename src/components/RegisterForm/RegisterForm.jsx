import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // event handlers
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div class="overlay">
      <form onSubmit={registerUser}>
        <div className="con">
          <header className="head-form">
            <Typography
              variant="h2"
              style={{
                fontFamily: 'redressed',
                marginBottom: 20,
              }}
            >
              Registration
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
            />
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
              Register{' '}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;