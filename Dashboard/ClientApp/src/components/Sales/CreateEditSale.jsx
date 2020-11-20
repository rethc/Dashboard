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
        const customer = e.split(',');
        this.setState({ customerId: customer[0] });
        this.setState({ customerLabel: customer[1] });
    }

    handleProduct = (e) => {
        const product = e.split(',');
        this.setState({ productId: product[0] });
        this.setState({ productLabel: product[1] });
    }

    handleStore = (e) => {
        const store = e.split(',');
        this.setState({ storeId: store[0] });
        this.setState({ storeLabel: store[1] });
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
                                <DropdownButton id="dropdown-basic-button" title={this.state.customerLabel} onSelect={this.handleCustomer}>
                                    {this.state.customers.map((customer) => {
                                        return (
                                            <Dropdown.Item key={customer.id}
                                                eventKey={[customer.id, `${customer.firstName} ${customer.lastName}`]}>
                                                {`${customer.firstName} ${customer.lastName}`}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </Form.Group>
                            <Form.Group controlId="product">
                                <Form.Label>Product</Form.Label>
                                <DropdownButton id="dropdown-basic-button" title={this.state.productLabel} onSelect={this.handleProduct}>
                                    {this.state.products.map((product) => {
                                        return (
                                            <Dropdown.Item key={product.id}
                                                eventKey={[product.id, product.name]}> {`${product.name}`}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </Form.Group>
                            <Form.Group controlId="store">
                                <Form.Label>Store</Form.Label>
                                <DropdownButton id="dropdown-basic-button" title={this.state.storeLabel} onSelect={this.handleStore}>
                                    {this.state.stores.map((store) => {
                                        return (
                                            <Dropdown.Item key={store.id}
                                                eventKey={[store.id, store.name]}> {`${store.name}`}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>

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