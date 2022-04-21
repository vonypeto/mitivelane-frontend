import React from "react";
import { Col, Row, Image } from "antd";

const Header = (data) => {
  return (
    <>
      <Col
        className="text-center "
        style={{
          float: "right",
          marginLeft: "auto",
          marginRight: 0,
        }}
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
      >
        <Image
          style={{
            height: "20%",
            width: "60%",
            float: "right",
            marginLeft: "auto",
            marginRight: 0,
          }}
          className="rounded"
          src={data?.firstLogo}
        />
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="text-center ">
          <b>Republic of the Philippines</b> <br />
          <b>Province of ____</b> <br />
          <b>Municipality of _____</b> <br />
          <b>Barangay ______</b> <br />
          <b>Office of the ________</b> <br /> <br /> <br />
        </div>
      </Col>
      <Col
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className="text-center"
        style={{ float: "left" }}
      >
        <Image
          style={{ height: "20%", width: "60%" }}
          className="rounded"
          src={data?.secondLogo}
        />
      </Col>
      <Col className="text-center" xs={24} sm={24} md={24} lg={24} xl={24}>
        <b style={{ letterSpacing: 2 }}>BARANGAY CLEARANCE</b>
      </Col>
    </>
  );
};
export default Header;
