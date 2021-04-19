import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  // const dispatch = useDispatch();
  // const getDNREndpoints = () => {
  //   console.log( 'in getDNREndpoints' );
  //   dispatchEvent
  //   axios.get('/api/dnr')
  //     .then( response => {
  //       console.log( response );
  //     })
  // }
  const user = useSelector((store) => store.user);
  return (
    <>
      <header>
        <h1>Floradex</h1>
        <h2>Let the Adventure Begin!</h2>
        <p>Add Leaderboard Position Here</p>
        <LogOutButton className="btn" />
      </header>
      <Link to = '/natural-areas'>
        <button>Find a Natural Area</button>
      </Link>
      <Link to = '/flora'>
        <button>Find a Plant</button>
      </Link>
      <Link to = {`/my-hunts/${user.id}`} params={user.id}>
        <button>My Hunts</button>
      </Link>
      {/* <Footer /> */}
      
      {/* <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        
      </div> */}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
