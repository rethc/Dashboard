import React, { Component } from 'react';
import NavMenu from './NavMenu';
import { Container } from 'react-bootstrap';
import classNames from "classnames";

export default class Layout extends Component {

    render() {
        return (
            <div>
                <NavMenu />
                <Container
                    fluid
                    className={classNames("content", { "is-open": this.props.isOpen })}
                >
                </Container>
                {this.props.children}
                <hr />
                <Container fluid>&copy; 2020 - Chesda Reth React.js </Container >
            </div>
        );
    }
}
