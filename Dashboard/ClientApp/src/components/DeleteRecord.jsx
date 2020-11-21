import React, { Component } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class DeleteRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: this.props.data.id,
            model: this.props.model
        }
    }

    delete = () => {
        this.setState({ open: false });
        axios.delete(`api/${this.state.model}s/${this.state.id}`)
            .then((res) => {
                this.props.reload();
            })
            .catch((err) => {
                alert(err);
            });
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <>
                <Button variant="secondary" onClick={this.handleOpen}>Delete</Button>

                <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.open}
                    onHide={this.handleClose}
                >
                    <Modal.Header>
                        <Modal.Title>Delete {this.props.model}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Cancel
                    </Button>
                        <Button variant="danger" onClick={this.delete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
