import React from "react";
import BasicDocument from "./documents/BasicDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, Col, Row, Image } from "antd";
const CertDisplay = (props) => {
  console.log(props.data);
  return (
    <Row justify="center">
      <Col
        justify="center"
        className="pr-1"
        xs={23}
        sm={23}
        md={18}
        lg={18}
        xl={18}
      >
        <Card
          className="text-center pdf-template-border"
          style={{
            backgroundColor: "#FFFFFF",
            height:
              props.width >= 1920
                ? 697
                : props.width >= 1080
                ? 540
                : props.width >= 500
                ? 540
                : 450,
            width:
              props.width >= 1920
                ? props.width - (props.height + 330)
                : props.width >= 1440
                ? props.width - props.height
                : null,
          }}
        >
          <Row>
            <Col
              className="text-center "
              style={{ float: "right" }}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <Image
                width={
                  props.width >= 1920 ? 80 : props.width >= 1024 ? 60 : null
                }
                className="rounded"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="pdf-template-font">
                {" "}
                <b>Republic of the Philippines</b> <b>Province of ____</b>{" "}
                <br />
                <b>Municipality of _____</b> <br />
                <b>Barangay ______</b> <br />
                <b>Office of the ________</b> <br />
              </div>
            </Col>
            {/* {props.data} */}
            {console.log(props.data)}
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
                width={
                  props.width >= 1920
                    ? 80
                    : props.width >= 1024
                    ? 60
                    : props.width >= 1920
                }
                className="rounded"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
          </Row>
          <PDFDownloadLink
            document={<BasicDocument />}
            fileName="fee_acceptance.pdf"
          >
            dasd
          </PDFDownloadLink>{" "}
        </Card>
      </Col>
    </Row>
  );
};

export default CertDisplay;
