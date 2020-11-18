import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';

export default class RecordsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {
            columns,
            model,
            data
        } = this.props

        return (
            <Container fluid>
                <h4>{model[0].toUpperCase() + model.slice(1)} Table </h4>

                <Table striped bordered>
                    <thead>
                        <tr>
                            {
                                columns.map((col) => {
                                    return (
                                        <th key={col}>
                                            {col[0].toUpperCase() + col.slice(1)}
                                        </th>
                                    )
                                })
                            }
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        {
                                            columns.map((col) => {
                                                if (col === 'dateSold') {
                                                    return (<td key={col}>{ }</td>)
                                                } else if (col === 'price') {
                                                    return (<td key={col}>${item[col]}</td>)
                                                } else {
                                                    return (<td key={col}>{item[col]}</td>)
                                                }
                                            })
                                        }
                                        {model === 'customer' && <td> Add New </td>}
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        )

    }
}