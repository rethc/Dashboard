import React, { Component } from 'react';
import NavMenu from './NavMenu';
import { Container } from 'react-bootstrap';

export default class Layout extends Component {

    render() {
        return (
            <div>
                <NavMenu />
                {this.props.children}
                <hr />
                <Container fluid>&copy; 2020 - Chesda Reth React.js </Container >
            </div>
        );
    }
}
