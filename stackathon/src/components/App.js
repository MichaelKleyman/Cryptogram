import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <NavbarComp />
        <Routes />
      </Router>
    </div>
  );
};

export default App;
