import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col md={24} sm={24} align="center">
          <span style={{ marginRight: 12 }}>Copyright © <FormattedMessage id="app.footer.company" /></span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
