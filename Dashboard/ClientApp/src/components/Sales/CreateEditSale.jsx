import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

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
            dateSold: this.props.data ? moment(this.props.data.dateSold).format('MM/DD/YYYY') : ''
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

    saveData = () => {
        this.setState({ open: false });
        this.props.option === 'Create' ? this.create() : this.update();
    }

    handleDateChange = (event) => {
        this.setState({
            dateSold: event.target.value
        }, () => console.log());

    }

    handleChange = (event, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const customerOptions = this.state.customers.map(obj => {
            return {
                'key': obj.id,
                'text': obj.name,
                'value': obj.id
            }
        })
        const productOptions = this.state.products.map(obj => {
            return {
                'key': obj.id,
                'text': obj.name,
                'value': obj.id
            }
        })
        const storeOptions = this.state.stores.map(obj => {
            return {
                'key': obj.id,
                'text': obj.name,
                'value': obj.id
            }
        })

        return (
            <Modal
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
                open={this.state.open}
                trigger={
                    this.props.option === 'Create' ?
                        <Button color='blue'>Add {this.props.model}</Button> :
                        <Button color='yellow'>
                            <Icon name='edit' /> EDIT
          </Button>
                }
            >
                <Modal.Header>{this.props.option} {this.props.model}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label='Date Sold'
                            name='dateSold'
                            value={this.state.dateSold}
                            onChange={this.handleChange}
                            placeholder='MM/DD/YYYY'
                        />

                        <Form.Select
                            label='Customer'
                            name='customerId'
                            options={customerOptions}
                            placeholder='Customer'
                            value={this.state.customerId}
                            onChange={this.handleChange}
                        />
                        <Form.Select
                            label='Product'
                            name='productId'
                            options={productOptions}
                            placeholder='Product'
                            value={this.state.productId}
                            onChange={this.handleChange}
                        />
                        <Form.Select
                            label='Store'
                            name='storeId'
                            options={storeOptions}
                            placeholder='Store'
                            value={this.state.storeId}
                            onChange={this.handleChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({ open: false })}>
                        cancel
          </Button>
                    <Button
                        content={this.props.option}
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.saveData}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}