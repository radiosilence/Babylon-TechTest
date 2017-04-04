import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


/**
 * Wrapper for everything.
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            Header
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
