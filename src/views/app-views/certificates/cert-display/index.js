import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import SplitPane, { Pane } from "react-split-pane";
import CertDisplay from "./cert-display";
import InputCert from "./input-display";

import { Col, Row } from "antd";
const Certificates = () => {
  const [parentData, setParentData] = useState({});
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const setData = (data) => {
    setParentData(data);
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

  return (
    <div>
      <PageHeaderAlt className="padding-none border-bottom" overlap>
        <div className="">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">Certificates</h2>
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
            <InputCert parentData={parentData} setParentData={setParentData} />
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
            <CertDisplay width={width} height={height} data={parentData} />
          </Col>{" "}
        </Row>
      </div>
    </div>
  );
};

export default Certificates;
