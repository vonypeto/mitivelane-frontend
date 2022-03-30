import React, { useState, useEffect, useRef } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import SplitPane, { Pane } from "react-split-pane";
import CertDisplay from "./cert-display";
import InputCert from "./input-display";
import { Col, Row, Button, Input } from "antd";
import { ArrowDownOutlined, ArrowLeftOutlined } from "@ant-design/icons";
const Certificates = () => {
  const refs = useRef();
  const [parentData, setParentData] = useState({});
  const [loading, setLoading] = useState(false);
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
      {" "}
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        {/* <div className="container-fluid">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <Button>Back</Button>
            <div>
              <Input
                style={{
                  border: "none",
                }}
                className="mb-3 cert-name"
                defaultValue="Untitled 1"
              />
              <Button type="primary">Download</Button>{" "}
            </div>
          </Flex>
        </div> */}{" "}
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-2">
            <Button icon={<ArrowLeftOutlined />}>Back</Button>{" "}
            <Input
              style={{
                border: "none",
                fontWeight: 900,
              }}
              className="mb-3 cert-name "
              defaultValue="Untitled 1"
            />
            <div>
              {" "}
              <Button icon={<ArrowDownOutlined />} type="primary">
                <span>Download</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="" style={{ marginTop: 95 }}>
        width: {width} ~ height: {height}
        <Row>
          <Col
            className="pl-2 "
            xs={0}
            sm={0}
            md={9}
            lg={12}
            style={{
              borderRightStyle: " solid",
              borderRight: "1px",
            }}
          >
            <InputCert parentData={parentData} setParentData={setData} />
          </Col>
          <Col
            style={{ overflow: "auto" }}
            justify="center"
            className="pl-2"
            xs={24}
            sm={24}
            md={15}
            lg={12}
          >
            {" "}
            <CertDisplay
              width={width}
              height={height}
              data={parentData}
              loadingImage={loading}
            />
          </Col>{" "}
        </Row>
      </div>
    </div>
  );
};

export default React.memo(Certificates, InputCert);
