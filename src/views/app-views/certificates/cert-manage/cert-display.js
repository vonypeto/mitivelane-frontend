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
  const ratio = 1.41451612903;

  // let testts = [
  //   { id: 1, test: 25 },
  //   { id: 2, test: 24 },
  // ];
  // testts = testts.map((data) => data.test + 1);

  useEffect(() => {
    localStorage.setItem("font", activeFontFamily);
    setChildData(data);
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
            onClick={() => generatePdfDocument(data, "feedata")}
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
            height: Math.floor((width / 3.5) * ratio),
          }}
        >
          <PDFTemplate
            data={data}
            selectedForm={1}
            min={4}
            max={9}
            width={width}
            type="view"
          />{" "}
        </Card>
      </Col>
    </Row>
  );
};

export default CertDisplay;
