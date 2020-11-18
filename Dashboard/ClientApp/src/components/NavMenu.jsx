import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavMenu extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/customers">Customers</Nav.Link>
                        <Nav.Link href="#products">Products</Nav.Link>
                        <Nav.Link href="#stores">Stores</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}