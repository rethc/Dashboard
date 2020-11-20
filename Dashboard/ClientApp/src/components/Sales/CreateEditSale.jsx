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
            customers: [],
            productId: this.props.data ? this.props.data.productId : '',
            products: [],
            storeId: this.props.data ? this.props.data.storeId : '',
            stores: [],
            dateSold: this.props.data ? this.props.data.dateSold : ''
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
        axios.put(`api/sales/${this.state.id}`, {
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
        console.log(e);
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

                                <DropdownButton id="dropdown-basic-button" title="Customer" onSelect={this.handleCustomer}>
                                    {this.state.customers.map((customer) => {
                                        return (
                                            <Dropdown.Item key={customer.id} eventKey={customer.id}>{`${customer.firstName} ${customer.lastName}`}</Dropdown.Item>
                                        )
                                    })}

                                </DropdownButton>
                            </Form.Group>
                            <Form.Group controlId="product">
                                <Form.Label>Product</Form.Label>

                            </Form.Group>
                            <Form.Group controlId="store">
                                <Form.Label>Store</Form.Label>

                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.saveSale}>
                            {this.props.option}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}