import React, { Component, PropTypes } from 'react';
import I from 'immutable';

import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

import AddBasketButton from './AddBasketButton';

/**
 * Wrapper for everything.
 *
 * @class App
 * @extends {Component}
 */
class Products extends Component {
  static propTypes = {
    shop: PropTypes.instanceOf(I.Map),
    shopActionCreators: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !I.is(this.props.shop, nextProps.shop);
  }

  handleOnAdd = (id, quantity) => {
    const { shopActionCreators: { addItem } } = this.props;
    addItem(id, quantity);
  };

  productNode({ id, name, price }) {
    return (
      <Col key={id} md={2}>
        {name} (£{price.toString()})
        <AddBasketButton onAdd={quantity => this.handleOnAdd(id, quantity)}/>
      </Col>
    );
  }

  productNodes() {
    const { shop: { products } } = this.props;
    return products.toSeq()
      .map(product => this.productNode(product));
  }

  render() {
    return (
      <Row>
        <Col md={12}><h2>Products</h2></Col>
        {this.productNodes()}
      </Row>
    );
  }
}


const mapStateToProps = (state) => ({
  shop: state.shop,
});

const mapDispatchToProps = (dispatch) => ({
  shopActionCreators: bindActionCreators(actions.shop, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
