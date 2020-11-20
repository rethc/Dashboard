import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import CreateEditStore from './CreateEditStore';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'store',
            columns: ['name', 'address'],
            data: [],
        }
    }

    componentDidMount = () => {
        this.getAllData();
    }

    getAllData = () => {
        axios.get(`api/Stores`)
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
                    <h4>Store Table</h4>
                    <CreateEditStore model={model} option={'Create'} reload={this.getAllData} />
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