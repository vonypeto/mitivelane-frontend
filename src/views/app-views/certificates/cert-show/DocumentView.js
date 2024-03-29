import React, { useState, useEffect } from "react";
import BasicDocument from "components/shared-components/Documents";
import { Card, Col, Row, Popover, Button } from "antd";
import FontPicker from "font-picker-react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { ArrowDownOutlined } from "@ant-design/icons";
import ColorPicker from "components/shared-components/ColorPicker";
import PopOverData from "components/shared-components/PopOverData";
import debounce from "lodash.debounce";

import utils from "utils/index";
import SinglePagePDFViewer from "components/shared-components/Documents";
import { Menu } from "antd";

const CertDisplay = React.memo(
  (props) => {
    // Props State
    const { data, templateType, certType, setParentData } = props;
    console.log(data);
    // Form State
    const [childData, setChildData] = useState(data);
    const [color, setColor] = useState(data?.color || "");
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [activeFontFamily, setActiveFontFamily] = useState(
      data ? data.font_family : "Tinos"
    );
    const ontopNavColorClick = debounce((value) => {
      const { rgb } = value;
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      const hex = utils.rgbaToHex(rgba);
      setColor(hex);
      console.log(hex);
      let data = childData;
      data.color = hex;
      setParentData(data);
    }, 300);

    // useEffect(() => {
    //   let isApiSubscribed = true;

    //   if (isApiSubscribed) {
    //     setChildData(data);
    //   }
    //   return () => {
    //     isApiSubscribed = false;
    //   };
    // }, [data]);

    useEffect(() => {
      let isApiSubscribed = true;
      let data = childData;
      if (isApiSubscribed) {
        localStorage.setItem("font", activeFontFamily);
        if (!(data.font_family === activeFontFamily)) {
          console.log(activeFontFamily, data.font_family);
          data.font_family = activeFontFamily;
          setParentData(data);
        }
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
        return URL.createObjectURL(blob);
      } catch (e) {
        console.log(e);
      }
    };

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
              {/* <Button
                icon={<ArrowDownOutlined />}
                onClick={() => generatePdfDocument(data, data.title)}
              >
                Download
              </Button> */}
              <div className="d-flex">
                <PopOverData
                  type="lineHeight"
                  data={data}
                  setData={setParentData}
                />
                <PopOverData
                  type="fontSize"
                  data={data}
                  setData={setParentData}
                />
                <ColorPicker
                  className="btn edit btn-primary ant-select ant-select-single ant-select-show-arrow"
                  color={color}
                  colorChange={ontopNavColorClick}
                />
              </div>
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
        <Col justify="center" className="pr-1">
          <GetCertificate />
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps
);

export default React.memo(CertDisplay);
