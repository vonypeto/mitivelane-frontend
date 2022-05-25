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
const CertDisplay = React.memo(
  (props) => {
    const { data, loadingImage, templateType, certType, setParentData } = props;
    const [activeFontFamily, setActiveFontFamily] = useState(
      data ? data?.font_family : "Tinos"
    );
    const [childData, setChildData] = useState(data);
    const [switchData, setSwitchData] = useState(false);
    const ratio = 1.41451612903;

    // let testts = [
    //   { id: 1, test: 25 },
    //   { id: 2, test: 24 },
    // ];
    // testts = testts.map((data) => data.test + 1);
    useEffect(() => {
      let isApiSubscribed = true;

      if (isApiSubscribed) {
        setChildData(data);
      }
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    }, [data]);

    useEffect(() => {
      let isApiSubscribed = true;
      let data = childData;
      if (isApiSubscribed) {
        localStorage.setItem("font", activeFontFamily);
        data.font_family = activeFontFamily;

        setParentData(data);
      }
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
      };
    }, [activeFontFamily]);

    const generatePdfDocument = async (data, fileName) => {
      try {
        const blob = await pdf(
          <BasicDocument
            data={data}
            fontType={activeFontFamily}
            templateType={templateType}
            certType={certType}
          />
        ).toBlob();
        console.log(blob);
        saveAs(blob, fileName);
      } catch (e) {
        console.log(e);
      }
    };

    const generatePdfDocumentShow = async (data) => {
      try {
        const blob = await pdf(
          <BasicDocument
            data={data}
            fontType={activeFontFamily}
            certType={certType}
            templateType={templateType}
            type="pdf"
          />
        ).toBlob();
        // console.log(URL.createObjectURL(blob));
        return URL.createObjectURL(blob);
      } catch (e) {
        console.log(e);
      }
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
        <>
          {certType && templateType ? (
            <SinglePagePDFViewer
              certType={certType}
              templateType={templateType}
              pdf={generatePdfDocumentShow(data)}
              type={"form"}
            />
          ) : null}
        </>
      );
    };
    return (
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card className="custom_cert">
            <div className="d-flex justify-content-between">
              {" "}
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
            </div>
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
          <GetCertificate />
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);

export default React.memo(CertDisplay);
