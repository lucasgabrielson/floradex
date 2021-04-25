import React from 'react';
import './Footer.css';
import {useSelector} from 'react-redux';

import {Link} from 'react-router-dom';


function Footer() {
  const user = useSelector((store) => store.user);

  return (
    <>
    <footer>
      <Link to = '/natural-areas'>
        <button>Natural Areas</button>
      </Link>
      <Link to = '/flora'>
        <button>Flora</button>
      </Link>
      <Link to = '/user'>
        <button>Home</button>
      </Link>
      <Link to = {`/my-hunts/${user.id}`} params={user.id}>
        <button>My Hunts</button>
      </Link>
      <Link to = {`/leaderboard/${user.id}`} params={user.id}>
        <button>Leaderboard</button>
      </Link>
      &copy; L. Clay Gabrielson
      </footer>
    </>
  
  );
}

export default Footer;
