import React, { useState, useEffect, useRef } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import SplitPane, { Pane } from "react-split-pane";
import CertDisplay from "./cert-display";
import InputCert from "./input-display";
import { Col, Row, Button, Input, Radio } from "antd";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Certificates = () => {
  const refs = useRef();
  const [parentData, setParentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [switchCert, setSwitchCert] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();

      return listener;
    },
    [height],
    [width]
  );
  const setData = (data) => {
    setLoading(!loading);
    console.log(data);
    let x = data;
    console;
    return setParentData(x);
  };

  useEffect(() => {
    console.log(parentData);
    setParentData(parentData);
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    }
  }, [parentData, loading]);

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-2">
            {/* new folder */}
            <Button icon={<ArrowLeftOutlined />}>Back</Button>
            <Input
              style={{
                border: "none",
                fontWeight: 900,
              }}
              className="cert-name "
              defaultValue="Untitled 1"
            />
            <div>
              <Button icon={<ArrowDownOutlined />} type="primary">
                <span>Download</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="" style={{ marginTop: 95 }}>
        {/* width: {width} ~ height: {height} */}

        <div>
          <Row>
            <Col
              className="pl-2 "
              xs={width >= 1399 || switchCert ? 24 : 0}
              sm={width >= 1399 || switchCert ? 24 : 0}
              md={width >= 1399 || switchCert ? 24 : 0}
              lg={width >= 1399 || switchCert ? 24 : 0}
              xl={width >= 1399 ? 12 : 24}
              xxl={width >= 1399 ? 12 : 24}
              style={{
                borderRightStyle: " solid",
                borderRight: "1px",
              }}
            >
              <InputCert
                parentData={parentData}
                setParentData={setData}
                width={width}
                switchCol={setSwitchCert}
              />
            </Col>
            <Col
              style={{ overflow: "auto" }}
              justify="center"
              className="pl-2"
              xs={width >= 1399 || !switchCert ? 24 : 0}
              sm={width >= 1399 || !switchCert ? 24 : 0}
              md={width >= 1399 || !switchCert ? 24 : 0}
              lg={width >= 1399 || !switchCert ? 24 : 0}
              xl={width >= 1399 ? 12 : 24}
              xxl={width >= 1399 ? 12 : 24}
            >
              <CertDisplay
                width={width}
                height={height}
                data={parentData}
                loadingImage={loading}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Certificates, InputCert);
