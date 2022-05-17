import React, { useState, useEffect } from "react";
import { Avatar, Tag, Row, Col, Drawer, Card, Divider, Button } from "antd";
import { EditOutlined, ArrowDownOutlined } from "@ant-design/icons";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";

const UserView = (props) => {
  const { data, visible, close } = props;
  let ratio = 1.41451612903;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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

      return () => {
        listener, setHeight(), setWidth();
      };
    },
    [height],
    [width]
  );

  let size = 500;
  if (width > 1400) {
    size = 600;
  } else if (width > 1024) {
    size = 550;
  } else if (width >= 550) {
    size = 550;
  } else if (width >= 425) {
    size = width;
  } else {
    size = width;
  }
  //  console.log(data);
  return (
    <Drawer
      width={size}
      placement="right"
      onClose={close}
      visible={visible}
      title="Clearance"
      className="custom-ant-header"
    >
      <Row
        style={{
          height: "100%",
          minHeight: "95%",
          display: "flex",
          width: "100%",
        }}
        justify="center"
      >
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={22}
          style={{
            display: "flex",
          }}
        >
          {data ? (
            <PDFTemplate
              data={{ name: "text" }}
              selectedForm={1}
              min={4}
              max={9}
              pdf={data}
              type={"drawer"}
            />
          ) : null}
        </Col>
        <Divider style={{ margin: "0px !important" }} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          Created
        </Col>
        <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
          Last 1 Hour Ago
        </Col>
        <Divider style={{ margin: "0px !important" }} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          Modfied
        </Col>
        <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
          Last 1 Hour Ago
        </Col>
        <div style={{ height: "120px" }}></div>
        <Card className="bottom-right-Drawer" style={{ width: "100%" }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button icon={<EditOutlined />}> Edit</Button>
            </Col>
            <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button icon={<ArrowDownOutlined />} type="primary">
                {" "}
                Download
              </Button>
            </Col>
          </Row>
        </Card>
      </Row>
    </Drawer>
  );
};

export default UserView;
