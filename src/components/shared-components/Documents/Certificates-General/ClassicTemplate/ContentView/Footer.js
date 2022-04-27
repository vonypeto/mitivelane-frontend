import React from "react";
import { Col, Row, Image } from "antd";
const Footer = (data) => {
  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <br />
        <span>OR No. _______</span> <br />
        <span>Issued at ______</span>
        <br />
        <span>Issued on ______</span>
        <br />
        <div className="text-center">
          <br />
          <span>
            <i>
              Note not valid with erasures and without the official seal of
              issuing office
            </i>
          </span>
        </div>
      </Col>
    </>
  );
};

export default Footer;
