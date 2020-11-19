import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import axios from 'axios';
import CreateEditCustomer from './CreateEditCustomer';
import { Container } from 'react-bootstrap';

export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'customer',
            columns: ['firstName', 'lastName', 'address'],
            data: [],
        }
    }

    componentDidMount = () => {
        this.getAllData();
    }

    getAllData = () => {
        axios.get(`api/Customers`)
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                alert(err);
            });
    }

    render() {
        const {
            model,
            columns,
            data
        } = this.state

        return (
            <div>
                <Container fluid>
                    <h4>Customer Table</h4>

                    <CreateEditCustomer model={model} option={'Create'} reload={this.getAllData} />
                    <p></p>

                </Container>

                <RecordsTable
                    columns={columns}
                    model={model}
                    data={data}
                />
            </div >
        )
    }
}