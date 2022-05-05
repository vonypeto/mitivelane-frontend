import React, { useState, useEffect } from "react";
import BasicDocument from "components/shared-components/Documents/Certificates-General/";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card, Col, Row, Image, Button } from "antd";
import FontPicker from "font-picker-react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { ArrowDownOutlined } from "@ant-design/icons";
import { BsCpu } from "react-icons/bs";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import SinglePagePDFViewer from "components/shared-components/Documents/Certificates-General/";
const CertDisplay = (props) => {
  const { data, loadingImage } = props;
  const [activeFontFamily, setActiveFontFamily] = useState("Tinos");
  const [childData, setChildData] = useState(data);
  const [switchData, setSwitchData] = useState(false);
  const ratio = 1.41451612903;

  // let testts = [
  //   { id: 1, test: 25 },
  //   { id: 2, test: 24 },
  // ];
  // testts = testts.map((data) => data.test + 1);
  console.log(data);
  useEffect(() => {
    setChildData(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("font", activeFontFamily);
  }, [activeFontFamily]);

  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      "data:application/pdf;base64,".length
    );

    const bytes = Buffer.from(base64WithoutPrefix).toString("base64");

    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: "application/pdf" });
  };

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const generatePdfDocument = async (data, fileName) => {
    const blob = await pdf(
      <BasicDocument data={data} fontType={activeFontFamily} selectedForm={1} />
    ).toBlob();
    console.log(blob);
    saveAs(blob, fileName);
  };

  const generatePdfDocumentShow = async (data) => {
    const blob = await pdf(
      <BasicDocument
        data={data}
        fontType={activeFontFamily}
        selectedForm={1}
        type="pdf"
      />
    ).toBlob();
    // console.log(URL.createObjectURL(blob));
    return URL.createObjectURL(blob);
    // var reader = new FileReader();
    // reader.readAsDataURL(blob);
    // return new Promise((resolve) => {
    //   reader.onloadend = () => {
    //     resolve(reader.result);
    //   };
    // });
  };
  // async function getBase64() {
  //   let result = await generatePdfDocumentShow(data, "feedata");

  //   return result + 1;
  // }
  // getBase64();

  const GetCertificate = () => {
    return (
      <SinglePagePDFViewer
        selectedForm={1}
        pdf={generatePdfDocumentShow(data)}
        type={"form"}
      />
    );
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
        {<GetCertificate />}
        {/* <Card
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
        </Card> */}
      </Col>
    </Row>
  );
};

export default React.memo(CertDisplay);
