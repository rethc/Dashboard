import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';
import CreateEditCustomer from './Customers/CreateEditCustomer';
import DeleteRecord from './DeleteRecord';


export default class RecordsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    parseDate = (d) => {
        const date = new Date(d);
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date);
    }


    render() {
        const {
            columns,
            model,
            data
        } = this.props

        return (
            <Container fluid>

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
                                                    return (<td key={col}>{this.parseDate(item[col])}</td>)
                                                } else if (col === 'price') {
                                                    return (<td key={col}>${item[col]}</td>)
                                                } else {
                                                    return (<td key={col}>{item[col]}</td>)
                                                }
                                            })
                                        }
                                        {model === 'customer' && <td>  <CreateEditCustomer model={model} data={item} option={'Edit'} reload={this.props.getAllData} /> </td>}
                                        {model === 'sale' && <td>Stuff </td>}
                                        {model === 'product' && <td>Stuff </td>}
                                        <td><DeleteRecord model={model} data={item} reload={this.props.getAllData} /></td>
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