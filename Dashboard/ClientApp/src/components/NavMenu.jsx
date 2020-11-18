import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default class NavMenu extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
                        <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                        <Nav.Link as={NavLink} to="/stores">Stores</Nav.Link>
                        <Nav.Link as={NavLink} to="/sales">Sales</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}