import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

export default ({ children, quantity, onRemove, onChangeQuantity }) =>
  <tr>
    <td>
      {children}
    </td>
    <td>
      <FormControl
        value={quantity}
        type="number"
        onChange={e => {
          e.preventDefault();
          onChangeQuantity(e.target.value);
        }} />
    </td>
    <td>
      <Button onClick={onRemove}>Remove</Button>
    </td>
  </tr>;

