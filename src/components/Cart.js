import React, { Component, PropTypes } from 'react';
import I from 'immutable';

import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

import CartRow from './CartRow';

/**
 * Wrapper for everything.
 *
 * @class App
 * @extends {Component}
 */
class Cart extends Component {
  static propTypes = {
    shop: PropTypes.instanceOf(I.Map),
    shopActionCreators: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return !I.is(this.props.shop, nextProps.shop);
  }

  rowNode({ id, cartId, quantity }) {
    const {
      shop,
      shopActionCreators: { removeItem, updateItemQuantity },
    } = this.props;
    return (
      <CartRow
        key={cartId}
        onRemove={() => removeItem(cartId)}
        onChangeQuantity={nextQuantity => updateItemQuantity(cartId, nextQuantity)}
        quantity={quantity}>
        {shop.getIn(['products', id, 'name'])}
      </CartRow>
    );
  }

  rowNodes() {
    const { shop: { cart } } = this.props;
    return cart
      .map(row => this.rowNode(row));
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          {this.rowNodes()}
          <pre>
            {JSON.stringify(this.props.shop.toJS(), null, 2)}
          </pre>
        </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
