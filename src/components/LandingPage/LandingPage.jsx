import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Button from '@material-ui/core/Button';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  // useEffect(() => { dispatch({ type: 'FETCH_NATURAL_AREAS' }); }, []);
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();
  const dispatch = useDispatch();



  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <br/>
      <br/>
      <br/>
      <h2>{heading}</h2>

      <div className="grid">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <Button onClick={onLogin}>
              Login
            </Button>
          </center>
      </div>
    </div>
  );
}

export default LandingPage;
