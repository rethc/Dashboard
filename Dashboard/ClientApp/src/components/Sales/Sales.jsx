import React, { Component } from 'react';
import axios from 'axios';
import RecordsTable from '../RecordsTable';
import CreateEditSale from './CreateEditSale';
import { Container } from 'react-bootstrap';

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
                    <CreateEditSale
                        model={model}
                        option={'Create'}
                        reload={this.getAllData}
                    />
                    <p></p>
                </Container>
                <RecordsTable
                    columns={columns}
                    model={model}
                    data={data}
                    getAllData={this.getAllData}
                />
            </div >
        )
    }
}