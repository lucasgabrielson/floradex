import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function UserPage() {
  useEffect(() => {
    dispatch({ type: 'CLEAR_PROCESSED_NATURAL_AREAS'})
    dispatch({ type: 'FETCH_NATURAL_AREAS_FOR_PROCESSING'});
  }, []);

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const flora = useSelector( store => store.naturalAreasProcessing);



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
