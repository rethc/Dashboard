import axios from 'axios';
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default class CreateEditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data ? this.props.data.id : null,
            firstName: this.props.data ? this.props.data.firstName : '',
            lastName: this.props.data ? this.props.data.lastName : '',
            address: this.props.data ? this.props.data.address : '',
        }
    }

    // Create a new customer record, then get data from database to reload component
    create = () => {
        axios.post(`api/Customers`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                alert(err);
            });
    }

    // Update the current customer record, then get data from database to reload component
    update = () => {
        axios.put(`api/Customers/${this.state.id}`, {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // When the button is clicked, close modal and add data to database
    saveCustomer = () => {
        this.setState({ open: false });
        this.props.option === 'Create' ? this.create() : this.update()
        this.setState({
            id: null,
            firstName: '',
            lastName: '',
            address: ''
        }, () => console.log())
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    }
    handleLastName = (e) => {
        this.setState({ lastName: e.target.value });
    }
    handleAddress = (e) => {
        this.setState({ address: e.target.value });
    }

    render() {
        return (
            <>
                {this.props.option === 'Create' ?
                    <Button variant="primary" onClick={this.handleOpen}>Create Customer</Button> :
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
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" value={this.state.firstName}
                                    onChange={this.handleFirstName} />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" value={this.state.lastName}
                                    onChange={this.handleLastName} />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" value={this.state.address}
                                    onChange={this.handleAddress} />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.saveCustomer}>
                            {this.props.option}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}