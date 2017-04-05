import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';

export default ({ children, quantity, onRemove, onChangeQuantity }) =>
  <Row>
    <Col md={6}>
      {children}
    </Col>
    <Col md={2}>
      <FormControl
        value={quantity}
        type="number"
        onChange={e => {
          e.preventDefault();
          onChangeQuantity(e.target.value);
        }} />
    </Col>
    <Col md={2}>
      <a href="" onClick={onRemove} />
    </Col>
  </Row>;

