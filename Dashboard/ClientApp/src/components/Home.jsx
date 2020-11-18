import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Home extends Component {

    render() {
        return (
            <Container>

                <h2>Chesda Reth</h2>
                <p>Welcome to my React web application that demonstrates <strong>CRUD</strong> (Create, Read, Update and Delete) operations. This app is built on: </p>
                <ul>
                    <li><a href='https://get.asp.net/' target="blank">ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' target="blank">C#</a> for cross-platform server-side code</li>
                    <li><a href='https://facebook.github.io/react/' target="blank">React</a> for client-side code</li>
                    <li><a href='https://react-bootstrap.github.io/' target="blank">React Bootstrap</a> for layout and styling</li>
                    <li> <a href='https://azure.microsoft.com/en-us/services/sql-database/' target="blank">Azure SQL Database</a> for the backend database</li>
                    <li> <a href='https://www.npmjs.com/package/react-axios' target="blank">react-axios</a> libraries for AJAX calls</li>
                </ul>

            </Container>
        );
    }
}