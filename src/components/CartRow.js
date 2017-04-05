import React from 'react';
import { Button, Row, Col, FormControl } from 'react-bootstrap';

export default ({ children, quantity, onRemove, onChangeQuantity }) =>
  <Row>
    <Col md={8}>
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
      <Button onClick={onRemove}>Remove</Button>
    </Col>
  </Row>;

