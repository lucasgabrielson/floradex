import React from 'react';
import './Footer.css';
import {useSelector} from 'react-redux';

import {Link} from 'react-router-dom';


function Footer() {
  const user = useSelector((store) => store.user);

  return (
    <>
    <footer>
      &copy; L. Clay Gabrielson
    </footer>
    </>
  
  );
}

export default Footer;
