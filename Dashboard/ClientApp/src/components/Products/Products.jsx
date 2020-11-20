import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import CreateEditProduct from './CreateEditProduct';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'product',
            columns: ['name', 'price'],
            data: [],
        }
    }

    componentDidMount = () => {
        this.getAllData();
    }

    getAllData = () => {
        axios.get(`api/Products`)
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
                    <h4>Products Table</h4>
                    <CreateEditProduct model={model} option={'Create'} reload={this.getAllData} />
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