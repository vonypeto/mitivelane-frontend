import React, { useState, useEffect } from "react";
import { Avatar, Tag, Row, Col, Drawer, Card, Divider, Button } from "antd";
import { EditOutlined, ArrowDownOutlined } from "@ant-design/icons";
import PDFTemplate from "components/shared-components/Documents/Certificates-General";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";
import { AUTH_ORGANIZATION } from "redux/constants/Auth";

const UserView = (props) => {
  // Props State
  const { data, visible, close } = props;
  // History State
  let history = useHistory();

  // Constant State
  const elm = data?.elm;
  const created = data?.created;
  const updated = data?.updated;
  const title = data?.title;
  let size = 500;

  // Functional State
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const navigateData = (data) => {
    console.log(data);
    return history.push(
      `/app/${localStorage.getItem(AUTH_ORGANIZATION)}/cert-display/${data}`
    );
  };

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
  const downloadFiles = () => {
    if (elm) saveAs(elm, title);
  };
  const timeSince = (date) => {
    var time = new Date(date);
    var seconds = Math.floor((new Date() - time) / 1000);
    // seconds -= +28800;
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  // Usage
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
            <PDFTemplate min={4} max={9} pdf={elm} type={"drawer"} />
          ) : null}
        </Col>
        <Divider style={{ margin: "0px !important" }} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          Created
        </Col>
        <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
          Last {timeSince(created)} Ago
        </Col>
        <Divider style={{ margin: "0px !important" }} />
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          Modfied
        </Col>
        <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
          Last {timeSince(updated)} Ago
        </Col>
        <div style={{ height: "120px" }}></div>
        <Card className="bottom-right-Drawer" style={{ width: "100%" }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Button
                icon={<EditOutlined />}
                onClick={() => navigateData(data?.id)}
              >
                Edit
              </Button>
            </Col>
            <Col className="text-right" xs={12} sm={12} md={12} lg={12} xl={12}>
              {elm ? (
                <Button
                  icon={<ArrowDownOutlined />}
                  onClick={() => downloadFiles()}
                  type="primary"
                >
                  Download
                </Button>
              ) : null}
            </Col>
          </Row>
        </Card>
      </Row>
    </Drawer>
  );
};

export default UserView;
