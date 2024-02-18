import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navigationBar">
      <Navbar collapseOnSelect expand="xl" bg="black" variant="dark">
        <Navbar.Brand href="/">
          <div className="logoTitle">
            IVVANCE
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/send">
              Send
            </Nav.Link>
            <Nav.Link as={Link} to="/receive">
              Receive
            </Nav.Link>
            <Nav.Link as={Link} to="/transaction-history">
              Tx History
            </Nav.Link>
            <Nav.Link as={Link} to="/price-history">
              ETH Price Chart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
