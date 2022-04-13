import React, { useState, useEffect } from "react";
import BasicDocument from "components/shared-components/Documents/Certificates-General";
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
  let testts = [
    { id: 1, test: 25 },
    { id: 2, test: 24 },
  ];
  testts = testts.map((data) => data.test + 1);
  console.log(testts);
  console.log(props.data.firstLogo);
  useEffect(() => {
    localStorage.setItem("font", activeFontFamily);
    setChildData(props.data);
    console.log(data);
  }, [activeFontFamily, data]);

  const generatePdfDocument = async (data, fileName) => {
    const blob = await pdf(
      <BasicDocument data={data} fontType={activeFontFamily} selectedForm={1} />
    ).toBlob();
    console.log(blob);
    saveAs(blob, fileName);
  };
  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24}>
        <Card className="custom_cert">
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
          />
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
          {data.clearance}
          <PDFTemplate
            data={data}
            selectedForm={1}
            min={4}
            max={9}
            width={width}
            type="view"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CertDisplay;
