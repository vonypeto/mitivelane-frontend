import React, { useState, useEffect } from "react";
import BasicDocument from "./documents/BasicDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, Col, Row, Image, Button } from "antd";
import FontPicker from "font-picker-react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
const CertDisplay = (props) => {
  const [activeFontFamily, setActiveFontFamily] = useState("Tinos");
  const [data, setData] = useState(props.data);

  useEffect(() => {
    localStorage.setItem("font", activeFontFamily);
    setData(props.data);
  }, [activeFontFamily, props.data]);
  console.log(props.data);

  const generatePdfDocument = async (data, fileName) => {
    const blob = await pdf(
      <BasicDocument data={data} fontType={activeFontFamily} />
    ).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <Row justify="center">
      <Col lg={24}>
        {" "}
        <Card className="custom_cert">
          {" "}
          <Button onClick={() => generatePdfDocument(props.data, "feedata")}>
            Download
          </Button>
          <FontPicker
            className="ant-select ant-select-single ant-select-show-arrow"
            apiKey={process.env.REACT_APP_FONT_ACCESS}
            activeFontFamily={activeFontFamily}
            limit={10}
            onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
          />{" "}
          {console.log(activeFontFamily)}
        </Card>
      </Col>
      <div id="test_id" className="apply-font">
        sdada
      </div>
      <Col
        justify="center"
        className="pr-1"
        xs={22}
        sm={19}
        md={18}
        lg={18}
        xl={18}
      >
        {" "}
        {/* <PDFDownloadLink
          document={
            <BasicDocument data={props.data} fontType={activeFontFamily} />
          }
          fileName="fee_acceptance.pdf"
        >
          dasd
        </PDFDownloadLink>{" "} */}
        {props.data.munipality}
        <Card
          className="text-center pdf-template-border apply-font"
          style={{
            backgroundColor: "#FFFFFF",
            height:
              props.width >= 1920
                ? 697
                : props.width >= 1080
                ? 600
                : props.width >= 1080
                ? 500
                : props.width >= 728
                ? 600
                : props.width >= 500
                ? 540
                : 500,
            width:
              props.width >= 1920
                ? props.width - (props.height + 330)
                : props.width >= 1800
                ? props.width - (props.height + 180)
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
                  props.width >= 1920
                    ? 80
                    : props.width >= 1024
                    ? 60
                    : props.width >= 768
                    ? 50
                    : 60
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
                    : props.width >= 768
                    ? 50
                    : 60
                }
                className="rounded"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CertDisplay;
