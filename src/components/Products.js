import React, { Component, PropTypes } from 'react';
import I from 'immutable';

import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

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
  render() {
    return (
      <Row>
        <Col md={12}>
          Products
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
