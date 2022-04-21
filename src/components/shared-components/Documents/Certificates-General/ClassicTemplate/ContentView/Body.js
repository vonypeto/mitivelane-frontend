import React from "react";
import { Col, Row, Image } from "antd";

const Body = (data) => {
  console.log(data);
  const { clean, lineHeight } = data;
  return (
    <>
      {" "}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div>TO WHOM IT CONCERN</div>

        <div style={{ textAlign: "justify", lineHeight: lineHeight }}>
          <div dangerouslySetInnerHTML={{ __html: clean }} />
          <span>
            This is to certify that
            <b> MR & MRS RAFAEL S ESTEBAN </b>is to bonafide resident of
            Barangay Fiesishare, talisay, Batangas.
          </span>
          <br />
          <br />
          <span>
            This certification issued upon the request of
            <b> MR & MRS RAFAEL S ESTEBAN </b> and whatever legal purpose this
            may serve him/her best
          </span>
          <br />
          <br />
          <span>
            Issuied thus 14th day if January, 2020 at Barangay BUhangin Proper,
            Davo CIty, Philippines
          </span>
        </div>
      </Col>
    </>
  );
};

export default Body;
