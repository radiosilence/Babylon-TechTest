import React, { Component, PropTypes } from 'react';
import { FormGroup, Button, FormControl } from 'react-bootstrap';

export default class AddBasketButton extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  handleOnAdd = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state.quantity);
  };

  handleUpdateQuantity = (event) => {
    event.preventDefault();
    this.setState({ quantity: event.target.value });
  }

  render() {
    return (
      <FormGroup>
        <FormControl type="number" value={this.state.quantity} onChange={this.handleUpdateQuantity} />
        <Button onClick={this.handleOnAdd}>Add</Button>
      </FormGroup>
    );
  }
}
