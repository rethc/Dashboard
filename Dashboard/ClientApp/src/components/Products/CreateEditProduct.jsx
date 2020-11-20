import axios from 'axios';
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default class CreateEditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data ? this.props.data.id : null,
            name: this.props.data ? this.props.data.name : '',
            price: this.props.data ? this.props.data.price : '',
        }
    }

    // Create a new product record, then get data from database to reload component
    create = () => {
        axios.post(`api/Products`, {
            name: this.state.name,
            price: this.state.price
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
            price: ''
        });
    }

    // Update the current product record, then get data from database to reload component
    update = () => {
        axios.put(`api/Products/${this.state.id}`, {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price
        })
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // When the button is clicked, close modal and add data to database
    saveProduct = () => {
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

    handlePrice = (e) => {
        this.setState({ price: e.target.value });
    }

    render() {
        return (
            <>
                {this.props.option === 'Create' ?
                    <Button variant="primary" onClick={this.handleOpen}>Create Product</Button> :
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
                                <Form.Control type="text" placeholder="Enter product name" value={this.state.name}
                                    onChange={this.handleName} />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" value={this.state.price}
                                    onChange={this.handlePrice} />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success" onClick={this.saveProduct}
                            disabled={!this.state.name || !this.state.price}>
                            {this.props.option}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}