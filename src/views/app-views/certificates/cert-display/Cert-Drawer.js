import React from "react";
import { Avatar, Tag, Row, Col, Drawer, Card, Divider, Button } from "antd";
import { EditOutlined, ArrowDownOutlined } from "@ant-design/icons";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";

const UserView = (props) => {
  const { data, visible, close, width } = props;
  let ratio = 1.41451612903;

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
        style={{ height: "100%", minHeight: "95%", display: "flex" }}
        justify="center"
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            height: Math.floor(size * ratio),
            display: "flex",
          }}
        >
          <Card style={{ width: "100%" }}>
            {" "}
            <PDFTemplate
              data={data}
              selectedForm={1}
              min={4}
              type="drawer"
              max={9}
              width={width}
            />
          </Card>
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
