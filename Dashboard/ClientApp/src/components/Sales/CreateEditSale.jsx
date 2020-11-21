import axios from 'axios';
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO, addDays } from 'date-fns';
import nz from 'date-fns/locale/en-NZ';

import "react-datepicker/dist/react-datepicker.css";

registerLocale("nz", nz);

export default class CreateEditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data ? this.props.data.id : null,
            customerId: this.props.data ? this.props.data.customerId : '',
            productId: this.props.data ? this.props.data.productId : '',
            storeId: this.props.data ? this.props.data.storeId : '',
            dateSold: this.props.data ? parseISO((this.props.data.dateSold), 'dd/MM/yyyy', "nz") : new Date(),
            customers: [], products: [], stores: []
        }
    }

    componentDidMount = () => {
        this.getAllCustomers();
        this.getAllProducts();
        this.getAllStores();
    }

    getAllCustomers = () => {
        axios.get('api/Customers')
            .then((res) => {
                this.setState({
                    customers: res.data
                })
            })
            .catch((err) => {
                alert(err);
            });
    }
    getAllProducts = () => {
        axios.get('api/Products')
            .then((res) => {
                this.setState({
                    products: res.data
                })
            })
            .catch((err) => {
                alert(err);
            });
    }
    getAllStores = () => {
        axios.get('api/Stores')
            .then((res) => {
                this.setState({
                    stores: res.data
                })
            })
            .catch((err) => {
                alert(err);
            });
    }

    create = () => {
        axios.post(`api/Sales`, {
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: addDays(new Date(this.state.dateSold), 1)
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                console.log(err.response);
            });

        this.setState({
            id: null,
            customerId: '',
            productId: '',
            storeId: '',
            dateSold: new Date()
        });
    }

    update = () => {
        axios.put(`api/Sales/${this.state.id}`, {
            id: this.state.id,
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: addDays(new Date(this.state.dateSold), 1)
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                alert(err);
            });
    }

    saveSale = () => {
        this.setState({ open: false });
        this.props.option === 'Create' ? this.create() : this.update();
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleDate = (date) => {
        this.setState({ dateSold: date })
        console.log(this.state.dateSold);
    }

    render() {

        return (
            <>
                {this.props.option === 'Create' ?
                    <Button variant="primary" onClick={this.handleOpen}>Create Sale</Button> :
                    <Button variant="secondary" onClick={this.handleOpen}>Edit</Button>
                }

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.open}
                    onHide={this.handleClose}
                >
                    <Modal.Header>
                        <Modal.Title>{this.props.option} {this.props.model}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>

                            <Form.Group controlId="date">
                                <Form.Label>Date Sold</Form.Label>
                                <br />
                                <DatePicker
                                    locale="nz"
                                    selected={this.state.dateSold}
                                    onChange={this.handleDate}
                                    dateFormat="dd/MM/yyyy"
                                    name="dateSold"
                                />
                            </Form.Group>


                            <Form.Group controlId="customer">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.customerId}
                                    onChange={e => this.setState({ customerId: e.target.value })}
                                >
                                    <option value='' disabled hidden>Select a customer</option>
                                    {this.state.customers.map((customer) => {
                                        return (
                                            <option key={customer.id} value={customer.id} >
                                                {`${customer.firstName} ${customer.lastName}`}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="product">
                                <Form.Label>Product</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={this.state.productId}
                                    onChange={e => this.setState({ productId: e.target.value })}
                                >
                                    <option value='' disabled hidden>Select a product</option>
                                    {this.state.products.map((product) => {
                                        return (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="store">
                                <Form.Label>Store</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={this.state.storeId}
                                    onChange={e => this.setState({ storeId: e.target.value })}
                                >
                                    <option value='' disabled hidden>Select a store</option>
                                    {this.state.stores.map((store) => {
                                        return (
                                            <option key={store.id} value={store.id}>
                                                {store.name}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.saveSale}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}