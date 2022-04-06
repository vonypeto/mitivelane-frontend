import React, { useState, useEffect } from "react";
import BasicDocument from "./documents/BasicDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, Col, Row, Image, Button } from "antd";
import FontPicker from "font-picker-react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { ArrowDownOutlined } from "@ant-design/icons";
import { BsCpu } from "react-icons/bs";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";

const CertDisplay = (props) => {
  const { data, loadingImage, width } = props;
  const [activeFontFamily, setActiveFontFamily] = useState("Tinos");
  const [childData, setChildData] = useState(data);
  const [switchData, setSwitchData] = useState(false);

  console.log(props.data.firstLogo);
  useEffect(() => {
    localStorage.setItem("font", activeFontFamily);
    setChildData(props.data);
    console.log(data);
  }, [activeFontFamily, data]);
  // useEffect(() => {}, [width]);
  const generatePdfDocument = async (data, fileName) => {
    const blob = await pdf(
      <BasicDocument data={data} fontType={activeFontFamily} />
    ).toBlob();
    console.log(blob);
    saveAs(blob, fileName);
  };
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24}>
        {" "}
        <Card className="custom_cert">
          {" "}
          <Button
            icon={<ArrowDownOutlined />}
            onClick={() => generatePdfDocument(props.data, "feedata")}
          >
            Download
          </Button>
          <FontPicker
            className=" btn edit btn-primary ant-select ant-select-single ant-select-show-arrow"
            apiKey={process.env.REACT_APP_FONT_ACCESS}
            activeFontFamily={activeFontFamily}
            limit={10}
            onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
          />{" "}
        </Card>
      </Col>

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
          className="pdf-template-border apply-font"
          style={{
            backgroundColor: "#FFFFFF",
            height:
              0 <= props.width && 374 >= props.width
                ? 585
                : 375 <= props.width && 424 >= props.width
                ? 590
                : 425 <= props.width && 648 >= props.width
                ? 640
                : 649 <= props.width && 767 >= props.width
                ? 700
                : 768 <= props.width && 1235 >= props.width
                ? 850
                : 1240 <= props.width && 1399 >= props.width
                ? 1000
                : 1400 <= props.width && 1500 >= props.width
                ? 670
                : 860,
            width:
              props.width >= 1920
                ? props.width - (props.height + 330)
                : props.width >= 1800
                ? props.width - (props.height + 180)
                : null,
          }}
        >
          <PDFTemplate
            data={{ name: "text" }}
            selectedForm={1}
            min={4}
            max={9}
            width={width}
            type="view"
          />
          {/* <Row>
            <Col
              className="text-center "
              style={{ float: "right" }}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              {loadingImage ? null : (
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
                  src={props.data.firstLogo}
                  // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="">
                <b>Republic of the Philippines</b> <b>Province of ____</b>{" "}
                <br />
                <b>Municipality of _____</b> <br />
                <b>Barangay ______</b> <br />
                <b>Office of the ________</b> <br /> <br /> <br />
                <b style={{ letterSpacing: 2, fontSize: 13 }}>
                  BARANGAY CLEARANCE
                </b>
              </div>
            </Col>
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
              {loadingImage ? null : (
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
                  src={props.data.secondLogo}
                  // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} justify="center">
              <br />

              <Row>
                <Col offset={1} className="text-left">
                  TO WHOM MAY IT CONCERN:
                </Col>
                <Col
                  xs={22}
                  sm={22}
                  md={22}
                  lg={22}
                  xl={22}
                  offset={1}
                  style={{ textAlign: "justify", textIndent: 30 }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Col>{" "}
                {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  asdsad asdsad asdsad asdsad asdsad asdsad asdsad asdsad asdsad
                  asdsad asdsad asdsad asdsad asdsad
              </Row>
            </Col>
          </Row> */}
        </Card>
      </Col>
    </Row>
  );
};

export default CertDisplay;
