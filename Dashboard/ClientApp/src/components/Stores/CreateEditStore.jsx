import axios from 'axios';
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default class CreateEditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data ? this.props.data.id : null,
            name: this.props.data ? this.props.data.name : '',
            address: this.props.data ? this.props.data.address : '',
        }
    }

    // Create a new store record, then get data from database to reload component
    create = () => {
        axios.post(`api/Stores`, {
            name: this.state.name,
            address: this.state.address
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                alert(err);
            });

        this.setState({
            id: null,
            name: '',
            address: ''
        });
    }

    // Update the current store record, then get data from database to reload component
    update = () => {
        axios.put(`api/Stores/${this.state.id}`, {
            id: this.state.id,
            name: this.state.name,
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
    saveStore = () => {
        this.setState({ open: false });
        this.props.option === 'Create' ? this.create() : this.update();
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleAddress = (e) => {
        this.setState({ address: e.target.value });
    }

    render() {
        return (
            <>
                {this.props.option === 'Create' ?
                    <Button variant="primary" onClick={this.handleOpen}>Create Store</Button> :
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
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter store name" value={this.state.name}
                                    onChange={this.handleName} />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter store address" value={this.state.address}
                                    onChange={this.handleAddress} />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.saveStore}
                            disabled={!this.state.name || !this.state.address}>
                            {this.props.option}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}