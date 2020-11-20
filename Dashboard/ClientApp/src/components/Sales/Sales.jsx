import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import CreateEditSale from './CreateEditSale';

export default class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'sale',
            columns: ['customer', 'product', 'store', 'dateSold'],
            data: [],
        }
    }

    componentDidMount = () => {
        this.getAllData();
    }

    getAllData = () => {
        axios.get(`api/Sales`)
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
                    <h4>Sales Table</h4>
                    <CreateEditSale model={model} option={'Create'} reload={this.getAllData} />
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