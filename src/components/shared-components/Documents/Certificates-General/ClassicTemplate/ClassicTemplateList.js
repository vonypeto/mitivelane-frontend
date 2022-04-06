import React, { useState, useEffect } from "react";

import { Col, Row, Image } from "antd";

import { Textfit } from "react-textfit";

const ClassicTemplateList = (props) => {
  const { data, max, min, width, lineHeight } = props;
  let size = 9;
  if (width >= 1920) {
    size = 9;
  } else if (width >= 1080) {
    size = 8;
  } else if (width >= 728) {
    size = 7;
  } else if (width >= 500) {
    size = 5;
  } else {
    size = 4;
  }
  console.log(size);
  return (
    <Row>
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
            width: "80%",
            float: "right",
            marginLeft: "auto",
            marginRight: 0,
          }}
          className="rounded"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="text-center ">
          <b>Republic of the Philippines</b> <br />
          <b>Province of ____</b> <br />
          <b>Municipality of _____</b> <br />
          <b>Barangay ______</b> <br />
          <b>Office of the ________</b> <br /> <br /> <br />
          {/* <b style={{ letterSpacing: 2 }}>BARANGAY CLEARANCE</b> */}
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
          style={{ height: "20%", width: "80%" }}
          className="rounded"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>

      <Col className="text-center" xs={24} sm={24} md={24} lg={24} xl={24}>
        <b style={{ letterSpacing: 2 }}>BARANGAY CLEARANCE</b>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        {/* Normal Line Height 16px */} <br />
        <div>TO WHOM IT CONCERN</div> <br />
        <div style={{ textAlign: "justify", lineHeight: lineHeight }}>
          <span>
            This is to certify that
            <b> MR & MRS RAFAEL S ESTEBAN </b>is to bonafide resident of
            Barangay Fiesishare, talisay, Batangas.
          </span>
          <br /> <br />
          <span>
            This certification issued upon the request of
            <b> MR & MRS RAFAEL S ESTEBAN </b> and whatever legal purpose this
            may serve him/her best
          </span>{" "}
          <br />
          <br />
          <span>
            Issuied thus 14th day if January, 2020 at Barangay BUhangin Proper,
            Davo CIty, Philippines
          </span>{" "}
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row justify="end" className="text-center">
          <Col span={12}>
            <div
              style={{
                // backgroundImage:
                //   "url(https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png)",
                backgroundPosition: "top",
                backgroundSize: "50px",
                backgroundRepeat: "no-repeat ",
              }}
              className="text-center "
            >
              <br />
              {/* <div
                className="text-left "
                style={{
                  textAlign: "left",

                  alignSelf: "left",
                  display: "block",
                }}
              > */}
              <Image
                src="/img/signature.png"
                style={{
                  width: "50%",

                  marginBottom: -12,
                  alignSelf: "center",
                  display: "inline",
                }}
              />{" "}
              <br />
              {/* </div> */}
              <span
                style={{
                  opacity: 0.9,
                  whiteSpace: "pre",
                  marginTop: -10,
                  paddingTop: -10,
                }}
              >
                ______________ <br />
                Applicant Signature
              </span>
            </div>
          </Col>
        </Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <br />
          <span>OR No. _______</span> <br />
          <span>Issued at ______</span>
          <br />
          <span>Issued on ______</span>
          <br />
          <div className="text-center">
            {" "}
            <br />
            <span>
              <i>
                Note not valid with erasures and without the official seal of
                issuing office
              </i>
            </span>{" "}
          </div>
        </Col>
      </Col>
    </Row>
  );
};

export default ClassicTemplateList;
