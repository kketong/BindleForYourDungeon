import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default function NavMenu(props) {
    return (
        <header>
            <Navbar {...props} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
                <Navbar.Brand as={Link} to="/Home">BindleForYourDungeon</Navbar.Brand>
                <Navbar.Toggle className="mr-2" />
                <Navbar.Collapse className="d-sm-inline-flex flex-sm-row-reverse">
                    <ul className="navbar-nav flex-grow">
                        <Nav>
                            <Nav.Link as={Link} className="text-dark" to="/Home">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} className="text-dark" to="/Characters">Characters</Nav.Link>
                        </Nav>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}