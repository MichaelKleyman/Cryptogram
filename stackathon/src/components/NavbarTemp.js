import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const NavbarTemp = () => {
  return (
    <div className='navbar'>
      {/* <nav className='navbar-link'>Home</nav> */}
      <Link to='/home' className='navbar-link'>
        Home
      </Link>
    </div>
  );
};

export default NavbarTemp;
