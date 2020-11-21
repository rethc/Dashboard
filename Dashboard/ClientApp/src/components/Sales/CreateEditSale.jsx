import axios from 'axios';
import React, { Component } from 'react';
import { Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

export default class CreateEditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data ? this.props.data.id : null,
            customerId: this.props.data ? this.props.data.customerId : '',
            productId: this.props.data ? this.props.data.productId : '',
            storeId: this.props.data ? this.props.data.storeId : '',
            dateSold: this.props.data ? this.props.data.dateSold : '',
            customers: [], products: [], stores: [],
            customerLabel: this.props.data ? this.props.data.customer : 'Customer',
            productLabel: this.props.data ? this.props.data.product : 'Product',
            storeLabel: this.props.data ? this.props.data.store : 'Store',
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
        axios.post('api/Sales', {
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: this.state.dateSold
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                alert(err);
            });
        this.setState({
            id: null,
            customerId: '',
            productId: '',
            storeId: '',
            dateSold: ''
        });
    }

    update = () => {
        axios.put(`api/Sales/${this.state.id}`, {
            id: this.state.id,
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: this.state.dateSold
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

    handleCustomer = (e) => {
        this.setState({ customerId: e.target.key });
        this.setState({ customerLabel: e.target.value });
    }

    handleProduct = (e) => {
        this.setState({ productId: e.target.key });
        this.setState({ productLabel: e.target.value });
    }

    handleStore = (e) => {
        this.setState({ storeId: e.target.key });
        this.setState({ storeLabel: e.target.value });
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
                            <Form.Group controlId="customer">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control as="select" value={this.state.customerLabel} onChange={this.handleCustomer} >
                                    {this.state.customers.map((customer) => {
                                        return (
                                            <option key={customer.id} value={`${customer.firstName} ${customer.lastName}`}>
                                                {`${customer.firstName} ${customer.lastName}`}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="product">
                                <Form.Label>Product</Form.Label>
                                <Form.Control as="select" value={this.state.productLabel} onChange={this.handleProduct} >
                                    {this.state.products.map((product) => {
                                        return (
                                            <option key={product.id} value={product.name}>
                                                {product.name}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="store">
                                <Form.Label>Store</Form.Label>
                                <Form.Control as="select" value={this.state.storeLabel} onChange={this.handleStore} >
                                    {this.state.stores.map((store) => {
                                        return (
                                            <option key={store.id} value={store.name}>
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