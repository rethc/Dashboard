import React, { Component } from 'react';
import RecordsTable from '../RecordsTable';
import axios from 'axios';

export default class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'sales',
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

                <RecordsTable
                    columns={columns}
                    model={model}
                    data={data}
                />
            </div >
        )
    }
}