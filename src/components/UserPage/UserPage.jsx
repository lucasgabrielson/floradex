import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function UserPage() {
  // On component mount get all of the api endpoints with plant information from the database
//   useEffect(() => {
//     dispatch({ type: 'FETCH_DNR_APIS' }); 
// }, []);

  const dispatch = useDispatch();

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
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
