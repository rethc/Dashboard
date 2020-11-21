import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';
import CreateEditCustomer from './Customers/CreateEditCustomer';
import CreateEditProduct from './Products/CreateEditProduct';
import CreateEditStore from './Stores/CreateEditStore';
import CreateEditSale from './Sales/CreateEditSale';
import DeleteRecord from './DeleteRecord';
import { format } from 'date-fns';


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
                                                    return (<td key={col}>{format(new Date(item[col]), 'dd/MM/yyyy')}</td>)
                                                } else if (col === 'price') {
                                                    return (<td key={col}>${item[col]}</td>)
                                                } else {
                                                    return (<td key={col}>{item[col]}</td>)
                                                }
                                            })
                                        }
                                        {model === 'customer' && <td> <CreateEditCustomer model={model} data={item} option={'Edit'} reload={this.props.getAllData} /> </td>}
                                        {model === 'product' && <td> <CreateEditProduct model={model} data={item} option={'Edit'} reload={this.props.getAllData} /> </td>}
                                        {model === 'store' && <td> <CreateEditStore model={model} data={item} option={'Edit'} reload={this.props.getAllData} /> </td>}
                                        {model === 'sale' && <td> <CreateEditSale model={model} data={item} option={'Edit'} reload={this.props.getAllData} />  </td>}
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