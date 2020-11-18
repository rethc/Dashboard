import React, { Component } from 'react';
import NavMenu from './NavMenu';

export default class Layout extends Component {

    render() {
        return (
            <div>
                <NavMenu />
                {this.props.children}

                <hr />
                <p>@Chesda Reth</p>
            </div>
        );
    }
}
