import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const NavbarComp = () => {
  return (
    <div>
      <Navbar bg='dark' variant={'dark'} expand='lg'>
        <Container className='nav-container'>
          <Navbar.Brand href='#home'>Crypto Coin Search</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/home' className='navbar-link'>
                Home
              </Nav.Link>
              {/* <Nav.Link as={Link} to='/genres'>
                Coin Names
              </Nav.Link> */}
              {/* <i class="fa-thin fa-bars"></i> */}
              <NavDropdown
                title='...'
                id='basic-nav-dropdown'
                className='navbar-link'
              >
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
