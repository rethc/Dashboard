import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import axios from 'axios';

export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'customers',
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

                <RecordsTable
                    columns={columns}
                    model={model}
                    data={data}
                />
            </div >
        )
    }
}